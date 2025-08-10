import Link from 'next/link'

export default function ProjectDetail({ project }: { project: any }) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{project.name}</h1>
      <p className="text-gray-600">{project.description}</p>
      <Link
        href={`/dashboard/${project.id}/edit`}
        className="inline-block mt-4 text-blue-500 underline"
      >
        编辑项目
      </Link>
    </div>
  )
}
