"use server";

import getCollection, {URL_COLLECTION} from "@/db";


export default async function createNewURL(url:string, alias:string){
  const p ={
    url: url,
    alias: alias,
  }

  const urlCollection = await getCollection(URL_COLLECTION);
  await urlCollection.insertOne(p);
}
