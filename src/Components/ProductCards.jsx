
import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCards() {
// const [count, setCount]= useState(0)

// const handleCart =()=>{
//     setCount(count+1)
//     localStorage.setItem("cartCount",count+1)


  const cards = [
    {
      id: 1,
      name: 'Premium Apple',
      description: 'Fresh and juicy apples picked from trusted farms.',
      amount: 120,
      quantity: '1 kg',
      image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 2,
      name: 'Organic Banana',
      description: 'Naturally sweet bananas, perfect for daily nutrition.',
      amount: 60,
      quantity: '1 dozen',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 3,
      name: 'Fresh Orange',
      description: 'Vitamin-rich oranges with bright citrus flavor.',
      amount: 90,
      quantity: '1 kg',
      image: 'https://images.unsplash.com/photo-1591206369811-4eeb2f03bc95?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 4,
      name: 'Green Grapes',
      description: 'Crisp seedless grapes for snacks, juices, and salads.',
      amount: 140,
      quantity: '500 g',
      image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=700&q=80',
    },
    {
  id: 5,
  name: 'Fresh Milk',
  description: 'Pure and fresh milk for tea, coffee, cereals, and daily use.',
  amount: 65,
  quantity: '1 L',
  image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=700&q=80',
},
{
  id: 6,
  name: 'Fresh Curd',
  description: 'Thick and creamy curd, perfect for meals, raita, and smoothies.',
  amount: 45,
  quantity: '400 g',
  image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=700&q=80',
},
{
  id: 7,
  name: 'Toothpaste',
  description: 'Refreshing toothpaste for strong teeth and long-lasting freshness.',
  amount: 120,
  quantity: '150 g',
  image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=700&q=80',
},
{
  id: 8,
  name: 'Coca Cola',
  description: 'Chilled Coca Cola soft drink for parties, meals, and refreshment.',
  amount: 40,
  quantity: '750 ml',
  image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=700&q=80',
},
{
  id: 9,
  name: 'Brown Bread',
  description: 'Soft and fresh brown bread, perfect for sandwiches and breakfast.',
  amount: 45,
  quantity: '400 g',
  image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80',
},
{
  id: 10,
  name: 'Potato Chips',
  description: 'Crispy salted potato chips for tea time, movies, and quick snacks.',
  amount: 30,
  quantity: '52 g',
  image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=700&q=80',
},
{
  id: 11,
  name: 'Orange Juice',
  description: 'Refreshing orange juice packed with fruity taste and freshness.',
  amount: 110,
  quantity: '1 L',
  image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=80',
},
{
  id: 12,
  name: 'Instant Noodles',
  description: 'Tasty instant noodles for a quick and easy meal anytime.',
  amount: 60,
  quantity: '280 g',
  image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=700&q=80',
},
  ];

  return (
    <section className="bg-white px-6 py-14">
      <div className="mx-auto max-w-6xl">


        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Products</h2>
          <p className="mt-3 text-gray-600">Choose fresh products at the best prices.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div key={card.id} className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <Link to={`/product/${card.id}`}>
                <img className="h-52 w-full object-cover" src={card.image} alt={card.name} />

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">{card.name}</h3>
                    <span className="rounded-md bg-green-100 px-2 py-1 text-sm font-semibold text-green-700">{card.quantity}</span>
                  </div>

                  <p className="mt-3 min-h-12 text-sm leading-6 text-gray-600">{card.description}</p>

                  <p className="mt-5 text-xl font-bold text-gray-900">Rs. {card.amount}</p>
                </div>
              </Link>

              <div className="px-5 pb-5">
                <button onClick={(e) => { e.preventDefault(); }} className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}