#!/usr/bin/env bash
set -euo pipefail

ROOT="$(pwd)"
if [ ! -f "$ROOT/package.json" ]; then
  echo "⚠️ 请在项目根目录运行本脚本（能看到 package.json 的位置）" >&2
  exit 1
fi

ensure_dir () {
  mkdir -p "$1"
}

write_file () {
  local path="$1"
  shift
  ensure_dir "$(dirname "$path")"
  cat > "$path" <<'TS'
$CONTENT$
TS
  # 替换占位符（bash 简易模板）
  sed -i "1,200s|\$CONTENT\$|$2|g" "$path" 2>/dev/null || true
}

# ---------- AvatarUploader ----------
avatar_uploader_tsx='// src/components/ui/AvatarUploader/AvatarUploader.tsx
import React from \"react\"

export type AvatarUploaderProps = {
  onUploaded?: (file: File, url: string) => void
  accept?: string
  className?: string
}

export default function AvatarUploader({ onUploaded, accept = \"image/*\", className }: AvatarUploaderProps) {
  const [preview, setPreview] = React.useState<string | null>(null)

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    setPreview((old) => {
      if (old) URL.revokeObjectURL(old)
      return url
    })
    onUploaded?.(file, url)
  }

  return (
    <div className={className}>
      <input type=\"file\" accept={accept} onChange={onChange} />
      {preview && (
        <img
          src={preview}
          alt=\"avatar preview\"
          style={{ width: 96, height: 96, borderRadius: 8, objectFit: \"cover\", display: \"block\", marginTop: 8 }}
        />
      )}
    </div>
  )
}
'

# ---------- Collapse ----------
collapse_tsx='// src/components/ui/Collapse/Collapse.tsx
import React from \"react\"

export interface CollapseProps {
  title: React.ReactNode
  defaultOpen?: boolean
  children?: React.ReactNode
  className?: string
}

export default function Collapse({ title, defaultOpen = false, children, className }: CollapseProps) {
  const [open, setOpen] = React.useState<boolean>(defaultOpen)

  return (
    <div className={className}>
      <button
        type=\"button\"
        onClick={() => setOpen((o) => !o)}
        style={{ display: \"flex\", alignItems: \"center\", gap: 8, fontWeight: 600 }}
      >
        <span style={{ transform: `rotate(${open ? 90 : 0}deg)`, transition: \"transform .15s\" }}>▶</span>
        {title}
      </button>
      {open && <div style={{ marginTop: 8 }}>{children}</div>}
    </div>
  )
}
'

# ---------- DatePicker ----------
datepicker_tsx='// src/components/ui/DatePicker/DatePicker.tsx
import React from \"react\"

export interface DatePickerProps {
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export default function DatePicker({ value, onChange, className }: DatePickerProps) {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.(e.target.value)
  }
  return <input className={className} type=\"date\" value={value} onChange={handleChange} />
}
'

# ---------- Tree ----------
tree_tsx='// src/components/ui/Tree/Tree.tsx
import React from \"react\"

export type TreeNode = {
  id: string | number
  label: React.ReactNode
  children?: TreeNode[]
}

export interface TreeProps {
  data: TreeNode[]
  className?: string
  onSelect?: (node: TreeNode) => void
}

function TreeItem({ node, onSelect }: { node: TreeNode; onSelect?: (n: TreeNode) => void }) {
  const [open, setOpen] = React.useState(false)
  const hasChildren = !!node.children?.length

  return (
    <li>
      <div style={{ cursor: hasChildren ? \"pointer\" : \"default\" }} onClick={() => (hasChildren ? setOpen((o) => !o) : onSelect?.(node))}>
        {hasChildren ? (open ? \"▼ \" : \"▶ \") : \"• \"}{node.label}
      </div>
      {hasChildren && open && (
        <ul style={{ marginLeft: 16 }}>
          {node.children!.map((child) => (
            <TreeItem key={child.id} node={child} onSelect={onSelect} />
          ))}
        </ul>
      )}
    </li>
  )
}

export default function Tree({ data, className, onSelect }: TreeProps) {
  return (
    <ul className={className} style={{ listStyle: \"none\", paddingLeft: 0 }}>
      {data.map((node) => (
        <TreeItem key={node.id} node={node} onSelect={onSelect} />
      ))}
    </ul>
  )
}
'

# ---------- Upload ----------
upload_tsx='// src/components/ui/Upload/Upload.tsx
import React from \"react\"

export interface UploadProps {
  multiple?: boolean
  accept?: string
  onFiles?: (files: File[]) => void
  className?: string
}

export default function Upload({ multiple = false, accept, onFiles, className }: UploadProps) {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = Array.from(e.target.files ?? [])
    if (files.length > 0) onFiles?.(files)
  }
  return <input className={className} type=\"file\" multiple={multiple} accept={accept} onChange={onChange} />
}
'

# ---------- UploadExcel ----------
upload_excel_tsx='// src/components/ui/UploadExcel/UploadExcel.tsx
import React from \"react\"
import * as XLSX from \"xlsx\"

export interface UploadExcelProps {
  onData?: (rows: unknown[]) => void
  accept?: string
  className?: string
}

export default function UploadExcel({ onData, accept = \".xlsx,.xls\", className }: UploadExcelProps) {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const buf = await file.arrayBuffer()
    const wb = XLSX.read(buf)
    const first = wb.SheetNames[0]
    const sheet = wb.Sheets[first]
    const json = XLSX.utils.sheet_to_json(sheet)
    onData?.(json)
  }
  return <input className={className} type=\"file\" accept={accept} onChange={handleChange} />
}
'

# 写文件到项目中（若路径存在才覆盖，以免误创建无关目录）
apply_if_exists () {
  local rel="$1"
  local content="$2"
  if [ -d "$(dirname "$rel")" ]; then
    printf '%s\n' "$content" > "$rel"
    echo "✓ 写入 $rel"
  else
    echo "… 跳过（目录不存在） $rel"
  fi
}

apply_if_exists "src/components/ui/AvatarUploader/AvatarUploader.tsx" "$avatar_uploader_tsx"
apply_if_exists "src/components/ui/Collapse/Collapse.tsx" "$collapse_tsx"
apply_if_exists "src/components/ui/DatePicker/DatePicker.tsx" "$datepicker_tsx"
apply_if_exists "src/components/ui/Tree/Tree.tsx" "$tree_tsx"
apply_if_exists "src/components/ui/Upload/Upload.tsx" "$upload_tsx"
apply_if_exists "src/components/ui/UploadExcel/UploadExcel.tsx" "$upload_excel_tsx"

echo
echo \"→ 可选：尝试格式化与自动修复（若本地已安装 prettier / eslint）\"
npx --yes prettier --write src/components/ui/*/*.tsx >/dev/null 2>&1 || true
npx --yes eslint \"src/**/*.{ts,tsx}\" --fix >/dev/null 2>&1 || true

echo
echo \"✅ 完成。建议执行：\\n   npm run lint \\n   npm run test\"
