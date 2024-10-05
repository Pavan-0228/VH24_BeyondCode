import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogClose } from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

const stocks = [
  {
    id: 1,
    name: 'Tech Corp',
    symbol: 'TECH',
    price: '$150.00',
    quantity: 10,
    change: '+2.5%',
    imageSrc: '/api/placeholder/32/32',
    imageAlt: 'Tech Corp logo',
  },
  {
    id: 2,
    name: 'Green Energy Ltd',
    symbol: 'GRN',
    price: '$75.50',
    quantity: 15,
    change: '-1.2%',
    imageSrc: '/api/placeholder/32/32',
    imageAlt: 'Green Energy Ltd logo',
  },
];

export default function StockPurchaseUI() {
  const [open, setOpen] = useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30" />
      
      {/* Dialog Content */}
      <DialogContent className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg sm:max-w-md w-full">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-medium text-gray-900">Stock Portfolio</DialogTitle>
            <DialogClose asChild>
              <button
                type="button"
                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close panel</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </DialogClose>
          </div>

          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {stocks.map((stock) => (
                  <li key={stock.id} className="flex py-6">
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-gray-200">
                      <img
                        src={stock.imageSrc}
                        alt={stock.imageAlt}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{stock.name}</h3>
                          <p className="ml-4">{stock.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{stock.symbol}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Qty {stock.quantity}</p>
                        <p className={`font-medium ${stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {stock.change}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total Value</p>
              <p>$3,625.00</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Values are updated in real-time based on market prices.
            </p>
            <div className="mt-6">
              <button
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Purchase Stocks
              </button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{' '}
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  Continue to Dashboard
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
