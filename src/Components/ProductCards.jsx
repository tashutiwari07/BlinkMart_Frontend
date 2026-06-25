
// import React from 'react';
// import { Link } from 'react-router-dom';

// export default function ProductCards() {
// // const [count, setCount]= useState(0)

// // const handleCart =()=>{
// //     setCount(count+1)
// //     localStorage.setItem("cartCount",count+1)


//   const cards = [
//     {
//       id: 1,
//       name: 'Premium Apple',
//       description: 'Fresh and juicy apples picked from trusted farms.',
//       amount: 120,
//       quantity: '1 kg',
//       image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=700&q=80',
//     },
//     {
//       id: 2,
//       name: 'Organic Banana',
//       description: 'Naturally sweet bananas, perfect for daily nutrition.',
//       amount: 60,
//       quantity: '1 dozen',
//       image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=700&q=80',
//     },
//     {
//       id: 3,
//       name: 'Fresh Orange',
//       description: 'Vitamin-rich oranges with bright citrus flavor.',
//       amount: 90,
//       quantity: '1 kg',
//       image: 'https://images.unsplash.com/photo-1591206369811-4eeb2f03bc95?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     },
//     {
//       id: 4,
//       name: 'Green Grapes',
//       description: 'Crisp seedless grapes for snacks, juices, and salads.',
//       amount: 140,
//       quantity: '500 g',
//       image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=700&q=80',
//     },

//   ];

//   return (
//     <section className="bg-white px-6 py-14">
//       <div className="mx-auto max-w-6xl">


//         <div className="mb-8 text-center">
//           <h2 className="text-3xl font-bold text-gray-900">Products</h2>
//           <p className="mt-3 text-gray-600">Choose fresh products at the best prices.</p>
//         </div>

//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {cards.map((card) => (
//             <div key={card.id} className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
//               <Link to={`/product/${card.id}`}>
//                 <img className="h-52 w-full object-cover" src={card.image} alt={card.name} />

//                 <div className="p-5">
//                   <div className="flex items-start justify-between gap-3">
//                     <h3 className="text-lg font-semibold text-gray-900">{card.name}</h3>
//                     <span className="rounded-md bg-green-100 px-2 py-1 text-sm font-semibold text-green-700">{card.quantity}</span>
//                   </div>

//                   <p className="mt-3 min-h-12 text-sm leading-6 text-gray-600">{card.description}</p>

//                   <p className="mt-5 text-xl font-bold text-gray-900">Rs. {card.amount}</p>
//                 </div>
//               </Link>

//               <div className="px-5 pb-5">
//                 <button onClick={(e) => { e.preventDefault(); }} className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700">
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import { Link } from 'react-router-dom';
import products from '../data/products';
import useCart from '../hooks/useCart';

export default function ProductCards() {
  const { addToCart, removeFromCart, getProductQuantity } = useCart();

  return (
    <section className="bg-white px-6 py-14">
      <div className="mx-auto max-w-6xl">

        <div className="mb-8 text-left">
          <h2 className="text-3xl font-bold text-blue-900">Products</h2>
          <p className="mt-3 text-gray-600">Choose fresh products at the best prices.</p>
        </div>


        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((card) => {
            const cartQuantity = getProductQuantity(card.id);

            return (
              <div key={card.id} className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <Link to={`/products/${card.id}`}>
                  <img className="h-52 w-full object-cover" src={card.image} alt={card.name} />
                </Link>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">{card.name}</h3>
                    <span className="rounded-md bg-green-100 px-2 py-1 text-sm font-semibold text-green-700">{card.quantity}</span>
                  </div>

                  <p className="mt-3 min-h-12 text-sm leading-6 text-gray-600">{card.description}</p>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <p className="text-xl font-bold text-gray-900">Rs. {card.amount}</p>
                    {cartQuantity > 0 ? (
                      <div className="flex h-10 items-center overflow-hidden rounded-md border border-gray-300">
                        <button
                          className="h-full w-9 text-lg font-bold text-gray-900 transition hover:bg-gray-100"
                          type="button"
                          onClick={() => removeFromCart(card.id)}
                        >
                          -
                        </button>
                        <span className="min-w-10 px-2 text-center text-sm font-bold text-gray-900">{cartQuantity}</span>
                        <button
                          className="h-full w-9 text-lg font-bold text-gray-900 transition hover:bg-gray-100"
                          type="button"
                          onClick={() => addToCart(card)}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        className="h-10 rounded-md bg-gray-900 px-4 text-sm font-semibold text-white transition hover:bg-gray-700"
                        type="button"
                        onClick={() => addToCart(card)}
                      >
                        ADD
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
