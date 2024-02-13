import EditForm from "@/components/admin/EditForm"

export default function EditPostPage({params}) {
    const {slug} = params;
    return (<EditForm slug={slug}/>)
}