import { DocumentNode, OperationVariables, StoreObject, gql, useMutation } from "@apollo/client"
import { FieldNode, OperationDefinitionNode } from "graphql";

export type EntityData<T> = T 

export function getEntityName(node: DocumentNode): string {
    if (node.definitions[0]?.kind === 'OperationDefinition') {
      const operationDefinition = node.definitions[0] as OperationDefinitionNode;
      const selectionSet = operationDefinition.selectionSet;
      if (selectionSet?.selections[0]?.kind === 'Field') {
        const field = selectionSet.selections[0] as FieldNode;
        return field.name.value;
      }
    }
    return ''
  }

export function getFieldName(node: DocumentNode): string  {
    if (node.definitions[0]?.kind === 'OperationDefinition') {
      const operationDefinition = node.definitions[0] as OperationDefinitionNode;
      const selectionSet = operationDefinition.selectionSet;
      if (selectionSet?.selections[0]?.kind === 'Field') {
        const field = selectionSet.selections[0] as FieldNode;
        return field.name.value;
      }
    }
    return ''
  }

export const useSaveEntity = (documentNode: DocumentNode, queryDocumentNode: DocumentNode) => {
  
    const [createOrUpdateEntity] = useMutation(documentNode);
     // Extract entity name from the documentNode
    const entityName = getEntityName(documentNode)
  // Extract field name to be updated dynamically
     const fieldName = getFieldName(queryDocumentNode)
    // console.log(queryDocumentNode)
    

    const saveEntity = async (entityData: EntityData<OperationVariables>, optimisticData?: EntityData<OperationVariables>) => {
  
      try {
        // console.log('data', optimisticData)
        const { data } = await createOrUpdateEntity({
          variables:  entityData,
          optimisticResponse: {
            [entityName]: optimisticData,
          },
          
          // update(cache, { data:  createOrUpdateEntity  }) {
          //   // Manually modify the cache to add the new reference to the entity list
          //   cache.modify({
          //     // id: cache.identify(entityData),
          //     //This is uncommented to work properly with fetchPolicy "cache-and-network"
          //     //due to the useSaveEntity when creating a new task can
          //     //not identify to which active query to append the task as 
          //     //the getAllTaskProject query doesn't have a reference to be identified with
            
          //     fields: {
          //         // the data or the new object to take its reference and add it to the fields
          //       [fieldName](existingProjectEntities = [], { readField }) {
                
          //         const newEntity = cache.writeFragment({
          //           data: createOrUpdateEntity[entityName],
          //            // take the reference of the new object
          //           fragment: gql`
          //             fragment EntityRef on Entity {
          //               id
          //             }
          //           `,
          //         });
               
          //         if (Array.isArray(existingProjectEntities)) {
                 
          //           if (existingProjectEntities.some((entity: StoreObject) => 
          //           readField('id', entity) === readField('id', newEntity))) {
          //             return existingProjectEntities.map((entity: StoreObject) => {
          //                 // update the object field with the new values
          //               return entity.id === createOrUpdateEntity[entityName].id ? newEntity : entity;
          //             });
  
          //           } else {
           
          //               // append the new object reference to update the fields in cache
          //             return [...existingProjectEntities, newEntity];
          //           }
          //         } else {
               
          //           if (readField('id', existingProjectEntities) === readField('id', newEntity)) {
          //             return newEntity
          //           } else {
                 
          //             return existingProjectEntities
          //           }
          //         }
          //       },
          //     },
          //   });
          // },
        });
        // console.log('data', data)
        return data
        // Handle successful response or perform additional actions
      } catch (error) {
        // Handle error
        console.log(error);
      }
    };
  
    return saveEntity;
  };