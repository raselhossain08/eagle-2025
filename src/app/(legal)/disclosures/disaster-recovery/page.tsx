import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DisasterRecoveryPage() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <div className="container mx-auto py-6">
        <Card className="bg-card text-card-foreground shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Disaster Recovery Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This Disaster Recovery Plan (DRP) outlines the procedures to ensure business continuity in the event of
              unforeseen disruptions.
            </p>
            <section className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Key Personnel</h2>
              <p className="text-muted-foreground">
                The designated successor will assume responsibility and team members will support the disaster recovery
                implementation.
              </p>
            </section>
            <section className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Notification Procedures</h2>
              <p className="text-muted-foreground">
                In the event of a disaster, internal and external notifications will be made according to the
                established timeline.
              </p>
            </section>
            <section className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Data Backup and Recovery</h2>
              <p className="text-muted-foreground">
                Regular data backups are stored securely off-site to ensure prompt restoration of critical systems and
                data.
              </p>
            </section>
            <section className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Testing and Review</h2>
              <p className="text-muted-foreground">
                The DRP is tested regularly and reviewed annually to ensure its effectiveness and relevance.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
