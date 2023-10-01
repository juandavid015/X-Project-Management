import { Outlet } from "react-router-dom";
import TasksProvider from "../../providers/TasksProvider";
// import { Kanban } from "./Kanban";
// import Calendar from "./Calendar";
// import List from "./List";
// import Gantt from "./Gantt";

const Tasks = () => {
    // // get the view to display via params. E.g. "kanban" view
    // const { view } = useParams();

    // // Render the current view
    // if (view === 'kanban') {
    //     return <Kanban />
    // }
    // else if(view === 'calendar') {
    //     return <Calendar />
    // }
    // else if(view === 'list') {
    //     return <List />
    // }
    // else if(view === 'gantt') {
    //     return <Gantt />
    // }
    // else {
    //     return <Kanban />
    // }
    return (
        <TasksProvider>
            <Outlet />
        </TasksProvider>
    )
}
export default Tasks;