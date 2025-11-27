import ProgressBar from "./ProgressBar"
import { Card, CardHeader, CardTitle } from "./ui/card"

export const UserInformation = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <ProgressBar />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Customer Information Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Your Information</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}
