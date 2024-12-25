import { useState } from "react"
import { StatsCard } from "@/components/StatsCard"
import { OrderCard } from "@/components/OrderCard"
import { mockOrders } from "@/data/mockOrders"
import type { Order } from "@/types"

export function DashboardPage() {
  const [orders] = useState<Order[]>(mockOrders)
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="Need Artwork" 
          value={orders.filter(o => o.status === "need_artwork").length} 
        />
        <StatsCard 
          title="Missing Info" 
          value={orders.filter(o => o.status === "missing_info").length}
        />
        <StatsCard 
          title="Can Produce" 
          value={orders.filter(o => o.status === "can_produce").length}
        />
        <StatsCard 
          title="Can Produce Other" 
          value={orders.filter(o => o.status === "can_produce_other").length}
        />
      </div>

      <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map(order => (
          <OrderCard 
            key={order.id} 
            order={order}
            onViewDetails={() => {}}
            onAddComment={() => {}}
          />
        ))}
      </div>
    </div>
  )
}