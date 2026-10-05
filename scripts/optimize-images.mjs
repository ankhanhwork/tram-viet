// One-time conversion of generated artwork to lighter WebP assets.
/* global console */
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { readdir, mkdir, writeFile, rename } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const publicDir=resolve(root,'public/images'), archive=resolve(root,'assets/generated');
await mkdir(archive,{recursive:true});
for(const name of await readdir(publicDir)) {
  if(!name.endsWith('.png'))continue;
  const source=resolve(publicDir,name), target=resolve(publicDir,name.replace(/\.png$/,'.webp'));
  const img=await loadImage(source),width=Math.min(1200,img.width),height=Math.round(img.height*width/img.width);
  const canvas=createCanvas(width,height);canvas.getContext('2d').drawImage(img,0,0,width,height);
  const bytes=await canvas.encode('webp',82);await writeFile(target,bytes);
  await rename(source,resolve(archive,name));console.log(`${name}: ${Math.round(bytes.length/1024)} KB`);
}
