import type { Prisma } from '@prisma/client'

import { listDir } from "api/src/lib/files";
import { db } from 'api/src/lib/db'

export default async () => {

  const path = process.env["FILESYSTEM_FOLDER"]
  const files = await listDir(path)
  console.log("importing files", files)
  Promise.all(
    files.map(async (path: Prisma.ImageCreateInput['path']) => {
      const record = await db.image.create({ data: {
        path,
          dateTaken: new Date(),
          dateEdited: new Date(),
          metadataJson: '',
        }
      })
      console.log(record)
    })
  )
}
