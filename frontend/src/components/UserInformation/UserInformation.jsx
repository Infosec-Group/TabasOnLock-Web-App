import { stylists } from "@/mock/mockData"
import ProgressBar from "../ProgressBar"
import StylistInfoPanel from "../StylistInfoPanel"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { UserInformationForm } from "./UserInformationForm"

export default function UserInformation() {
  return (
    <div className="max-w-6xl mx-auto">
      <ProgressBar />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Left Side - Customer Information Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-rubik">Your Information</CardTitle>
              <p className="text-dark-secondary-fg">Please provide your contact details to proceed with booking</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <UserInformationForm />

              <div className="flex space-x-4 pt-6">
                <Button
                  variant="outline"
                  className="flex-1 h-12"
                >
                  Cancel
                </Button>
                <Button className="flex-1 h-12">
                  Confirm
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Stylist Information */}
        <StylistInfoPanel />
      </div>
    </div>
  )
}
