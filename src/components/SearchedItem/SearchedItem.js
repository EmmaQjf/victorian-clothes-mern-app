import SearchClothesList from "../SearchClothesList/SearchClothesList"
import * as itemsAPI from '../../utilities/items-api';

import {useState, useEffect} from 'react'
export default function SearchedItem (
    {input,
        setCurrentItem,
        showClothPage,
        setShowClothPage}
){

    
    const [allClothes, setAllClothes]= useState(null)
        useEffect(() => {
        async function getAllClothes() {
            try {
                const clothes = await itemsAPI.getAll();
                setAllClothes(clothes);
            } catch (error) {
                console.error(error);
            }
        }
        getAllClothes();
       }, []);

       const[searchedItems, setSearchedItems] = useState([])
       useEffect(function(){
         if(allClothes) {
            const foundClothes = allClothes.filter(cloth => cloth.title.toLowerCase().includes(input.toLowerCase().trim()));
            setSearchedItems(foundClothes);}
    },[input])
 

    
   
    // const searchedClothes = () => {
    //     return allClothes.filter(cloth => cloth.title.toLowerCase().includes(input.toLowerCase().trim()))}
    //    console.log(searchedClothes())
       
    return (
        <>
         {
            searchedItems.length?
            <SearchClothesList setCurrentItem={setCurrentItem}
            showClothPage={showClothPage}
            setShowClothPage={setShowClothPage} clothes={searchedItems}/>:'NO match items'

         }
        </>
    )
       
}