import { NextApiRequest, NextApiResponse } from 'next'
import { getDatabase } from '../../lib/mongodb'
import { contactFormSchema, ContactSubmission } from '../../types/contact'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // Validate the form data
    const validatedData = contactFormSchema.parse(req.body)

    // Connect to database
    const db = await getDatabase()
    const collection = db.collection<ContactSubmission>('contact')

    // Create the contact submission document
    const contactSubmission: ContactSubmission = {
      ...validatedData,
      createdAt: new Date(),
      status: 'new',
    }

    // Insert the document
    const result = await collection.insertOne(contactSubmission)

    // Return success response
    res.status(201).json({
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
      id: result.insertedId,
    })
  } catch (error) {
    console.error('Contact form submission error:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        message: 'Please check your form data and try again.',
        errors: error,
      })
    }

    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    })
  }
}
