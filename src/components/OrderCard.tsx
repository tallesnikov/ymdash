import { Eye, MessageSquare } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { StatusBadge } from './StatusBadge'
import type { Order } from '@/types'

interface OrderCardProps {
  order: Order
  onViewDetails: () => void
  onAddComment: () => void
}

export function OrderCard({ order, onViewDetails, onAddComment }: OrderCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium">#{order.id}</span>
              <StatusBadge status={order.status} />
            </div>
            <div className="text-sm text-gray-500">
              {order.factory} • {order.sourcing_agent}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onViewDetails}>
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onAddComment}>
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="aspect-square relative rounded-lg overflow-hidden mb-3">
          <img
            src={order.design_preview}
            alt="Design preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
            <p className="font-medium text-sm">{order.order_details.song_name}</p>
            <p className="text-sm opacity-90">{order.order_details.singer}</p>
          </div>
        </div>

        <div className="flex gap-2 items-center mb-3">
          <img
            src={order.thumbnail}
            alt="Product thumbnail"
            className="w-12 h-12 object-cover rounded"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{order.product_name}</p>
            <p className="text-xs text-gray-500">Designer: {order.designer}</p>
          </div>
        </div>

        <Select defaultValue={order.status}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Set Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="need_artwork">Need Artwork</SelectItem>
            <SelectItem value="missing_info">Missing Info</SelectItem>
            <SelectItem value="can_produce">Can Produce</SelectItem>
            <SelectItem value="can_produce_other">Can Produce Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  )
}