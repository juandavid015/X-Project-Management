const NotificationCreateProject = () => {
    return (
        <div className="flex flex-col gap-4 p-4">
            <span className="text-dark-purple-md font-bold">
                Done!
            </span>
            <h2 className="font-heading text-2xl text-electric-blue">
                Your project was created successfully!
            </h2>
            <p>
                Now you can invite members to join your project
                by sharing the next code:
            </p>
            <div className="p-4 bg-white-purple">
                code here 123d464abvb
            </div>
        </div>
    )
}
export default NotificationCreateProject;