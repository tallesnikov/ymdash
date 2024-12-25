import { useState } from 'react'
import { StatusCard } from '@/components/StatusCard'
import { FilterBar } from '@/components/FilterBar'
import { StatusTabs } from '@/components/StatusTabs'
import { OrderCard } from '@/components/OrderCard'
import { OrderDetailsModal } from '@/components/OrderDetailsModal'
import { CommentModal } from '@/components/CommentModal'
import { STATUSES } from '@/constants/dashboardConstants'
import { mockOrders } from '@/data/mockOrders'

export function DesignDashboard() {
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedAgent, setSelectedAgent] = useState('all')
  const [selectedFactory, setSelectedFactory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [commentModalOpen, setCommentModalOpen] = useState(false)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

  const statusCounts = mockOrders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const filteredOrders = mockOrders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
    const matchesAgent = selectedAgent === 'all' || order.sourcing_agent === selectedAgent
    const matchesFactory = selectedFactory === 'all' || order.factory === selectedFactory
    const matchesSearch = !searchTerm || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.order_details.song_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.order_details.singer.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesStatus && matchesAgent && matchesFactory && matchesSearch
  })

  const selectedOrder = mockOrders.find(order => order.id === selectedOrderId)

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Design Dashboard</h1>
          <p className="text-gray-500">Manage design orders</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {Object.entries(STATUSES).map(([status, { label, color }]) => (
            <StatusCard
              key={status}
              label={label}
              count={statusCounts[status] || 0}
              color={color}
            />
          ))}
        </div>

        <FilterBar
          searchTerm={searchTerm}
          selectedAgent={selectedAgent}
          selectedFactory={selectedFactory}
          onSearchChange={setSearchTerm}
          onAgentChange={setSelectedAgent}
          onFactoryChange={setSelectedFactory}
        />

        <StatusTabs
          selectedStatus={selectedStatus}
          statusCounts={statusCounts}
          onStatusChange={setSelectedStatus}
        />

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredOrders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              onViewDetails={() => {
                setSelectedOrderId(order.id)
                setDetailsModalOpen(true)
              }}
              onAddComment={() => {
                setSelectedOrderId(order.id)
                setCommentModalOpen(true)
              }}
            />
          ))}
        </div>

        <OrderDetailsModal
          order={selectedOrder}
          open={detailsModalOpen}
          onOpenChange={setDetailsModalOpen}
        />

        <CommentModal
          order={selectedOrder}
          open={commentModalOpen}
          onOpenChange={setCommentModalOpen}
        />
      </div>
    </div>
  )
}