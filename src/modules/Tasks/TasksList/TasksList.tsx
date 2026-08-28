import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Spinner } from "@/components/ui/spinner"
import { EditTaskModal } from "@/modules/Tasks/EditTaskModal"
import { DeleteTaskModal } from "@/modules/Tasks/DeleteTaskModal"
import { useTasks } from "./useTasks"

export const TasksList = () => {
    const { data: tasks = [], isPending, isError, error } = useTasks()

    return (
        <>
            <Table>
                <TableCaption>A list of your recent tasks.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">#</TableHead>
                        <TableHead className="w-[100px]">Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isPending && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                <Spinner className="mx-auto size-8 mx-auto my-4" />
                            </TableCell>
                        </TableRow>
                    )}
                    {isError && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center text-destructive">{error.message}</TableCell>
                        </TableRow>
                    )}
                    {!isPending && !isError && tasks.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">No tasks found.</TableCell>
                        </TableRow>
                    )}
                    {!isPending && !isError && tasks.map((task) => (
                        <TableRow key={task.id}>
                            <TableCell className="font-medium">{task.id}</TableCell>
                            <TableCell className="font-medium">{task.title}</TableCell>
                            <TableCell>{task.status.split("_").join(" ")}</TableCell>
                            <TableCell>{task.priority}</TableCell>
                            <TableCell>{task.dueDate}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1">
                                    <EditTaskModal
                                        task={task}
                                    />
                                    <DeleteTaskModal
                                        task={task}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}
