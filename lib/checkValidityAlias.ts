"use server";

import getCollection, {URL_COLLECTION} from "@/db";


export default async function checkValidityAlias(alias:string){

  const urlCollection = await getCollection(URL_COLLECTION);
  const data = await urlCollection.findOne({alias:alias});

    if(data===null){
        return null;
    }
    return(data.url);
}
