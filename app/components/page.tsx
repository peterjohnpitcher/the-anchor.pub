'use client'

import { useState } from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
  Input,
  Alert,
  Badge,
  Container,
  Section,
  Grid,
  GridItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Breadcrumb,
  NavBar,
  Form,
  FormField,
  FormSection,
  Select,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  DatePicker,
  Switch,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  Tooltip,
  Popover,
  PopoverBody,
  Spinner,
  Skeleton,
  LoadingOverlay,
  useToast,
  ToastProvider
} from '@/components/ui'

function ComponentsPageContent() {
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  return (
    <div>
      <NavBar
        logo={{ src: '/logo.png', alt: 'The Anchor' }}
        items={[
          { label: 'Home', href: '/' },
          { label: 'Components', href: '/components' },
          { label: 'Documentation', href: '/docs' }
        ]}
      />

      <Section spacing="lg">
        <Container size="xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Component Library Showcase
            </h1>
            <p className="text-lg text-gray-700">
              Explore all the standardized React components available in The Anchor website.
            </p>
          </div>

          <Tabs defaultValue="buttons" className="space-y-8">
            <TabsList>
              <TabsTrigger value="buttons">Buttons</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="forms">Forms</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="overlays">Overlays</TabsTrigger>
              <TabsTrigger value="loading">Loading</TabsTrigger>
            </TabsList>

            <TabsContent value="buttons" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Button Variants</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="danger">Danger</Button>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Button Sizes</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="flex items-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Button States</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-wrap gap-4">
                    <Button loading>Loading</Button>
                    <Button disabled>Disabled</Button>
                    <Button fullWidth>Full Width</Button>
                  </div>
                </CardBody>
              </Card>
            </TabsContent>

            <TabsContent value="cards" className="space-y-6">
              <Grid cols={3} gap="md">
                <Card>
                  <CardHeader>
                    <CardTitle>Default Card</CardTitle>
                  </CardHeader>
                  <CardBody>
                    This is a default card with standard styling.
                  </CardBody>
                  <CardFooter>
                    <Button size="sm">Action</Button>
                  </CardFooter>
                </Card>

                <Card variant="outlined">
                  <CardHeader>
                    <CardTitle>Outlined Card</CardTitle>
                  </CardHeader>
                  <CardBody>
                    This card has a more prominent border.
                  </CardBody>
                </Card>

                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle>Elevated Card</CardTitle>
                  </CardHeader>
                  <CardBody>
                    This card has a shadow for elevation.
                  </CardBody>
                </Card>
              </Grid>
            </TabsContent>

            <TabsContent value="forms" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Form Components</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={async (data) => {
                    console.log('Form data:', Object.fromEntries(data))
                    toast({
                      variant: 'success',
                      title: 'Form submitted',
                      description: 'Cheque console for form data'
                    })
                  }}>
                    <FormSection title="Text Inputs">
                      <Grid cols={2} gap="md">
                        <FormField name="name" label="Name" required>
                          <Input name="name" placeholder="Enter your name" />
                        </FormField>
                        <FormField name="email" label="Email" required>
                          <Input name="email" type="email" placeholder="email@example.com" />
                        </FormField>
                      </Grid>
                    </FormSection>

                    <FormSection title="Selection Controls">
                      <Grid cols={2} gap="md">
                        <FormField name="country" label="Country">
                          <Select
                            name="country"
                            options={[
                              { value: 'uk', label: 'United Kingdom' },
                              { value: 'us', label: 'United States' },
                              { value: 'ca', label: 'Canada' }
                            ]}
                            placeholder="Choose a country"
                          />
                        </FormField>
                        <FormField name="date" label="Date">
                          <DatePicker name="date" />
                        </FormField>
                      </Grid>

                      <CheckboxGroup
                        label="Interests"
                        options={[
                          { value: 'entertainment', label: 'Entertainment' },
                          { value: 'food', label: 'Food & Drink' },
                          { value: 'events', label: 'Special Events' }
                        ]}
                      />

                      <RadioGroup
                        name="newsletter"
                        label="Newsletter Frequency"
                        options={[
                          { value: 'daily', label: 'Daily' },
                          { value: 'weekly', label: 'Weekly' },
                          { value: 'monthly', label: 'Monthly' }
                        ]}
                      />

                      <Switch name="notifications" label="Enable notifications" />
                    </FormSection>

                    <div className="flex justify-end gap-4 mt-6">
                      <Button type="button" variant="ghost">Cancel</Button>
                      <Button type="submit" variant="primary">Submit</Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </TabsContent>

            <TabsContent value="feedback" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Alerts</CardTitle>
                </CardHeader>
                <CardBody className="space-y-4">
                  <Alert variant="info">
                    This is an informational alert message.
                  </Alert>
                  <Alert variant="success" title="Success!">
                    Your action has been completed successfully.
                  </Alert>
                  <Alert variant="warning" title="Warning">
                    Please review this important information.
                  </Alert>
                  <Alert variant="error" title="Error" onClose={() => {}}>
                    Something went wrong. Please try again.
                  </Alert>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Badges</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge variant="success" dot>Active</Badge>
                  </div>
                </CardBody>
              </Card>
            </TabsContent>

            <TabsContent value="overlays" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Modal & Overlays</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-wrap gap-4">
                    <Button onClick={() => setModalOpen(true)}>
                      Open Modal
                    </Button>

                    <Tooltip content="This is a helpful tooltip">
                      <Button variant="secondary">Hover for Tooltip</Button>
                    </Tooltip>

                    <Popover
                      trigger="click"
                      content={
                        <PopoverBody>
                          <p className="font-semibold mb-2">Popover Content</p>
                          <p className="text-sm text-gray-700">
                            This is a popover with rich content support.
                          </p>
                        </PopoverBody>
                      }
                    >
                      <Button variant="outline">Click for Popover</Button>
                    </Popover>

                    <Button
                      variant="ghost"
                      onClick={() => {
                        toast({
                          variant: 'success',
                          title: 'Toast notification',
                          description: 'This is a toast message!'
                        })
                      }}
                    >
                      Show Toast
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </TabsContent>

            <TabsContent value="loading" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Loading States</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-4">Spinners</h4>
                      <div className="flex items-center gap-4">
                        <Spinner size="sm" />
                        <Spinner size="md" />
                        <Spinner size="lg" />
                        <Spinner size="xl" color="secondary" />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Skeletons</h4>
                      <div className="space-y-4">
                        <Skeleton variant="text" count={3} />
                        <div className="flex gap-4">
                          <Skeleton variant="circular" className="h-12 w-12" />
                          <div className="flex-1">
                            <Skeleton variant="text" width="md" />
                            <Skeleton variant="text" width="sm" className="mt-2" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Loading Overlay</h4>
                      <Button
                        onClick={() => {
                          setLoading(true)
                          setTimeout(() => setLoading(false), 3000)
                        }}
                      >
                        Show Loading Overlay
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </TabsContent>
          </Tabs>
        </Container>
      </Section>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} size="md">
        <ModalHeader>
          <ModalTitle>Example Modal</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p>This is an example modal dialog with focus management and keyboard navigation.</p>
          <p className="mt-2 text-sm text-gray-700">
            Press ESC to close or click the close button.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {
            setModalOpen(false)
            toast({
              variant: 'success',
              title: 'Action confirmed',
              description: 'Modal action was successful!'
            })
          }}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>

      <LoadingOverlay visible={loading} message="Loading content..." />
    </div>
  )
}

export default function ComponentsPage() {
  return (
    <ToastProvider>
      <ComponentsPageContent />
    </ToastProvider>
  )
}