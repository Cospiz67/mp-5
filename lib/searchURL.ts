// "use server"

// import getCollection, { URL_COLLECTION } from "@/db";

// export default async function searchURL(alias:string) {
//     const urlCollection = await getCollection(URL_COLLECTION);
//     const data = await urlCollection.findOne({ alias: alias });

//     if (data === null) {
//         return redirect(`/error`);;
//     }

//     return redirect(data.url);;
// }