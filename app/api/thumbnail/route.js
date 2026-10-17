import sharp from 'sharp';
import path from 'node:path';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export async function GET(request){
 const width=Number(new URL(request.url).searchParams.get('width')||320);
 if(![160,320,640].includes(width))return Response.json({error:'Choose width 160, 320 or 640'},{status:422});
 try{const image=await sharp(path.join(process.cwd(),'public','mountains.jpg')).resize(width).webp({quality:75}).toBuffer();console.log('thumbnail rendered',width,image.length);return new Response(image,{headers:{'Content-Type':'image/webp','Cache-Control':'no-store'}})}
 catch(error){console.error('sharp thumbnail failed',error.message);return Response.json({error:error.message},{status:500})}
}
