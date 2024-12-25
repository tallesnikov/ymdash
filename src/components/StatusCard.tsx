import { Card } from "@/components/ui/card"

interface StatusCardProps {
  label: string
  count: number
  status: 'need_artwork' | 'missing_info' | 'can_produce' | 'can_produce_other'
}

export function StatusCard({ label, count, status }: StatusCardProps) {
  const bgColors = {
    need_artwork: 'bg-[#FFEBEE]',
    missing_info: 'bg-[#FFF3E0]',
    can_produce: 'bg-[#E8F5E9]',
    can_produce_other: 'bg-white'
  }

  return (
    <Card className={`p-4 ${bgColors[status]}`}>
      <h3 className="font-medium">{label}</h3>
      <p className="text-2xl font-bold">{count}</p>
    </Card>
  )
}