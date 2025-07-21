// src/lib/api.ts
export async function fetchProjectList() {
  const res = await fetch('/api/projects/list');
  if (!res.ok) {
    throw new Error('项目列表加载失败');
  }
  return res.json();
}
