import { getAllSchemas } from '@/lib/dynamic-schema'

export async function SchemaScript() {
  const schemas = await getAllSchemas()
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemas)
      }}
    />
  )
}