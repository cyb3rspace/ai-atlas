import Atlas from './atlas'
import { promises as fs } from 'fs'
import path from 'path'

export default async function Page() {
  const file = await fs.readFile(path.join(process.cwd(), 'public', 'data.json'), 'utf-8')
  const data = JSON.parse(file)
  return <Atlas data={data} />
}
