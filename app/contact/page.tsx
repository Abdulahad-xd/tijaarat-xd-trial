"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Youtube,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general"
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast("Message sent successfully! We'll get back to you soon.")
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        inquiryType: "general"
      })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted px-6 py-4 border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-muted-foreground rounded-full"></div>
            <span className="font-semibold text-foreground">Tijarat</span>
          </Link>
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                  <CardDescription>
                    We're here to help and answer any question you might have.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Email</h3>
                      <p className="text-muted-foreground">BabarAzam@Tijarat.com</p>
                      <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Phone</h3>
                      <p className="text-muted-foreground">+1 (650) 555-0111</p>
                      <p className="text-sm text-muted-foreground">Mon-Fri 9AM-6PM EST</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Address</h3>
                      <p className="text-muted-foreground">
                        123 Business Street<br />
                        Suite 100<br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Business Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle>Follow Us</CardTitle>
                  <CardDescription>
                    Stay connected with us on social media
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-3">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Facebook className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Instagram className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Twitter className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Youtube className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          type="text"
                          placeholder="How can we help you?"
                          value={formData.subject}
                          onChange={(e) => handleInputChange("subject", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Inquiry Type</Label>
                      <RadioGroup 
                        value={formData.inquiryType} 
                        onValueChange={(value) => handleInputChange("inquiryType", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="general" id="general" />
                          <Label htmlFor="general">General Inquiry</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="support" id="support" />
                          <Label htmlFor="support">Technical Support</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sales" id="sales" />
                          <Label htmlFor="sales">Sales Question</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="partnership" id="partnership" />
                          <Label htmlFor="partnership">Partnership</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry..."
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className="min-h-[120px]"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        "Sending Message..."
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Find answers to common questions about our products and services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What are your shipping options?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We offer standard shipping (2-3 business days) and express shipping (1-2 business days). 
                    Free shipping is available on orders over $100.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do you offer bulk discounts?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes, we offer volume discounts for bulk orders. Contact our sales team for custom pricing 
                    on orders over 100 units.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What is your return policy?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We offer a 30-day money-back guarantee on all products. Items must be in original 
                    condition and packaging.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How can I track my order?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Once your order ships, you'll receive a tracking number via email. You can also 
                    track your order in your account dashboard.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}










