'use client'

import React, { useEffect, useState } from 'react'
import { Produto } from '../models/interfaces';
import useSWR from 'swr';
import Card from '../_components/Card/Card';
import CardCart from '../_components/Card/CardCart';


export default function ProductsPage () {
  const fetcher = (url : string) => fetch(url).then((res) => res.json());
  const { data,error } = useSWR<Produto[]>('/api/produtos',fetcher);
  const [search,setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<Produto[]>([])
  const [cart,setCart] = useState<Produto[]>([])

  useEffect(() => {
    if(data){
      const newFilteredData = data.filter((produto) => {
        return produto.title.toLowerCase().includes(search.toLowerCase())
      })
      setFilteredData(newFilteredData)
    }    
  },[search,data])

  useEffect(() => {
    const cart = localStorage.getItem("cart")
    if(cart){
      setCart(JSON.parse(cart))
    }
  },[])
  
  useEffect(() => {
    localStorage.setItem("cart",JSON.stringify(cart))
  },[cart])

 

  function addToCart(produto : Produto){
  
      setCart((prevCart) => [...prevCart,produto]);
  }
  if (error) return <div>Failed to load</div>; 
  if (!data) return <div>No data available</div>;

  return ( <div>  
   <input  
      placeholder="Pesquise um produto..."
      value={search}
      onChange = {(e) => setSearch(e.target.value)}/>
      
   { filteredData.map((produto) => {
    return <Card produto={produto} addToCart={addToCart}></Card>
   }) }
    <h1>Cesto de compras</h1>
    {cart.map((produto) => {
    return <CardCart produto={produto}></CardCart>
   }) }

  </div>
    
  )
}
