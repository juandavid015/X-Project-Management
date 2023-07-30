import { Task } from "@prisma/client";
import { getNextId, prisma } from "../db";
import { AssignMemberToTaskArgs, CreateTaskArgs, GetProjectTasksArgs, MemberConnectDisconnect, MoveTaskArgs, RemoveTaskArgs, TaskExt, UpdateTaskArgs } from "../types/types";


export interface TaskDataSource {
  getTasksByProjectId: (parent: unknown, args: GetProjectTasksArgs)=> Promise<Task[]>
  createTask: (parent: unknown, args: CreateTaskArgs)=> Promise<Task>
  updateTaskByPosition: (parent: unknown, args: MoveTaskArgs)=> Promise<Task>
  updateTaskMembers: (parent: unknown, args: AssignMemberToTaskArgs)=> Promise<Task>
  deleteTaskById: (parent: unknown, args: RemoveTaskArgs)=> Promise<Task>
  updateTask: (parent: unknown, args: UpdateTaskArgs)=> Promise<TaskExt>
}

export const generateTaskModel = ({userIsAuthenticated}): TaskDataSource => ({
    getTasksByProjectId: async (_, args) => {
        // throw new GraphQLError('Invalid user credentials', {
        //   extensions: {code: 'UNAUTHENTICATED', }
        // })
        return await prisma.task.findMany({
        where: {
            projectId: args.projectId
        },
        include: {
            members: true
        },
        orderBy: [
            {indexPosition: 'asc'}
        ]
        })
    },
    createTask: async (_, args) => {
        let { projectId, userIds, id, ...taskData } = args

     
          return await prisma.task.create({data: {
            indexPosition: await getNextId(),
            ...taskData,
            project: {
              connect: {id: projectId}
            },
            members: {
              connect: userIds.map((id: string) => ({id}))
            },
            
          }, 
          include: {
            members: true
          }
        })

    },
    //Update the task changing its indexPosition, this way the task can be moved of position
    updateTaskByPosition: async(_, args) => {
        const {previousTaskPosition, nextTaskPosition, actualTaskPosition, actualTaskId, newStatus} = args;
        let task = await prisma.task.findUnique({where: {id: actualTaskId}})
        let targetTaskPosition = task.indexPosition;

        let newActualTaskPosition:number;

        if ((previousTaskPosition && actualTaskPosition && newActualTaskPosition) && targetTaskPosition === previousTaskPosition) {
          newActualTaskPosition = (actualTaskPosition + (actualTaskPosition + 0.002 ))/ 2
        } else if ((actualTaskPosition && previousTaskPosition && nextTaskPosition) && targetTaskPosition !== previousTaskPosition) {
          newActualTaskPosition = (previousTaskPosition + nextTaskPosition) / 2
        } else if(actualTaskPosition && !nextTaskPosition && !previousTaskPosition) {
          newActualTaskPosition = actualTaskPosition - 1;
        } else if (actualTaskPosition && !previousTaskPosition && nextTaskPosition ) {
          newActualTaskPosition = actualTaskPosition - 1;
        } else if ((actualTaskPosition && !nextTaskPosition && previousTaskPosition) && targetTaskPosition === previousTaskPosition) {
          newActualTaskPosition = await getNextId();  
        } else if ((actualTaskPosition && !nextTaskPosition && previousTaskPosition && targetTaskPosition !== previousTaskPosition)) {
          newActualTaskPosition = ((previousTaskPosition + 0.003 )+ actualTaskPosition) / 2;
        } else if (!actualTaskPosition) {
          newActualTaskPosition = await getNextId();
        }

        if(newActualTaskPosition === actualTaskPosition) {
          newActualTaskPosition -= 0.001
        }
        const updatedTask = await prisma.task.update({
          where: { id: actualTaskId },
          data: { indexPosition: newActualTaskPosition, status: newStatus },
          include: { members: true }
        })

        return updatedTask;
      },

      updateTaskMembers: async (_, args) => {
        let {taskId, userId, ...taskData} = args

        let memberAssigned = await prisma.task.update({
          where: {
            id: taskId
          }, 
          data: {
            ...taskData,
            members: {
              connect: {id: userId}
            }
          },
          include: {
            members: true
          }
        })

        return memberAssigned
      },
      deleteTaskById: async(_, {id}) => {
      
        const deletedTask = await prisma.task.delete({
          where: {
            id: id
          }
        })

        return deletedTask;
      },

      updateTask: async (_, args) => {
        const { id, userIds, ...taskData } = args;
        const data: {
          members?: MemberConnectDisconnect; // Explicitly include members property in the data type
          [key: string]: any; // Allow any other properties (dynamic)
        } = { ...taskData };
      
        if (userIds) {
          const task = await prisma.task.findUnique({
            where: {
              id: id,
            },
            include: {
              members: true,
            },
          });
      
          const existingMembers = task.members.map((member) => member.id);
      
          const membersToAdd = userIds.filter((userId: string) => !existingMembers.includes(userId));
          const membersToRemove = existingMembers.filter((memberId) => !userIds.includes(memberId));
      
          data.members = {
            connect: membersToAdd.map((userId: string) => ({ id: userId })),
            disconnect: membersToRemove.map((userId) => ({ id: userId })),
          };
        }
      
        const updatedTask = await prisma.task.update({
          where: {
            id: id,
          },
          data: data,
          include: {
            members: true,
          },
        });
      
        return updatedTask;
      },
})