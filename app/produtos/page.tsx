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

  const buy = () => {
    fetch("/api/deisishop/buy", {
      method: "POST",
      body: JSON.stringify({
        products: cart.map(product => product.id),
        name: "",
        student: false,
        coupon: ""
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      setCart([]);
    })
    .catch(() => {
      console.log("error ao comprar");
    });
  }
  

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

  function removeFromCart(produtoId: string) {
    setCart((prevCart) => {
      const index = prevCart.findIndex((item) => item.id === produtoId);
      if (index !== -1) {
        const updatedCart = [...prevCart];
        updatedCart.splice(index, 1); // Remove uma instância do produto
        return updatedCart;
      }
      return prevCart; // Retorna o carrinho inalterado se o produto não existir
    });
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
    return <CardCart produto={produto} removeFromCart={removeFromCart}></CardCart>
   }) }
    <button onClick={() => {
        buy();
      }} >Comprar</button>  

  </div>
    
  )
}
