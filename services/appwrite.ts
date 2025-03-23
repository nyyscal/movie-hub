import {Client, Databases, ID, Query} from "react-native-appwrite"
//track teh searches made by user
const DATABASE_ID=process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID=process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
.setEndpoint("https://cloud.appwrite.io/v1")
.setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const database = new Databases(client)

export const updateSearchCount = async(query:string,movie:Movie)=>{
  const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, 
    [Query.equal("searchTerm",query)])
    console.log(result)
    try {
      if(result.documents.length > 0){
        const exisitngMovies = result.documents[0];
        await database.updateDocument(
          DATABASE_ID,COLLECTION_ID,exisitngMovies.$id,
          {count:exisitngMovies.count+1}
        )
      }else{
        await database.createDocument(DATABASE_ID,COLLECTION_ID,ID.unique(),{
          searchTerm:query,
          movie_id:movie.id,
          count:1,
          title:movie.title,
          poster_url:"https://image.tmdb.org/t/p/w500"+movie.poster_path
      })}
    } catch (error) {
      console.log(error)
      throw error
    }

  //check if a record of that search has been already stored
  //if docs found increment the search count else create a new docs and inititalize it to 1
  
}