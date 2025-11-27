import { Card, CardContent, CardFooter } from './ui/card'
import { Clock, PhilippinePeso, Star } from 'lucide-react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

export default function StylistCard({ stylist = {} }) {
  const initials = (stylist.name || '')
    .split(' ')
    .map(n => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
            {initials}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-dark-fg">{stylist.name}</h3>
            <p className="text-dark-secondary-fg">{stylist.specialty}</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-dark-fg">
            <Clock className="w-4 h-4 mr-2" />
            {stylist.experience} experience
          </div>
          <div className="flex items-center text-sm text-dark-fg">
            <Star className="w-4 h-4 mr-2 text-yellow-500" />
            {stylist.rating} rating
          </div>
          <div className="flex items-center text-sm text-dark-fg">
            <PhilippinePeso className="w-4 h-4 mr-2" />
            ₱{stylist.price} per service
          </div>
        </div>

        <Badge variant="secondary" className="mb-4">
          Available Today
        </Badge>
      </CardContent>

      <CardFooter className="pt-0">
        <Button
          onClick={() => onSelect(stylist)}
          className="w-full"
        >
          Book with {stylist.name.split(' ')[0]}
        </Button>
      </CardFooter>
    </Card>
  )
}
