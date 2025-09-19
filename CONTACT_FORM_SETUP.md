# Contact Form Setup Guide

## Overview
A comprehensive contact form has been implemented with the following features:
- ✅ Professional design matching your website's aesthetic
- ✅ Form validation using Zod and React Hook Form
- ✅ MongoDB integration for storing submissions
- ✅ Toast notifications for user feedback
- ✅ Responsive design for all devices
- ✅ Industry-appropriate fields and options

## Features

### Form Fields
- **Personal Information**: Name, Email, Phone, Company
- **Project Details**: Service needed, Budget range, Timeline, Detailed message
- **Validation**: Client-side and server-side validation with helpful error messages

### Services Offered
- Web Development
- Mobile App Development
- UI/UX Design
- DevOps & Infrastructure
- Consulting
- Other

### Budget Ranges
- $5,000 - $15,000
- $15,000 - $50,000
- $50,000 - $100,000
- $100,000+
- Not sure yet

### Timeline Options
- ASAP
- 1-2 months
- 3-6 months
- 6+ months
- Flexible

## Setup Instructions

### 1. Environment Configuration
Create a `.env.local` file in your project root with:

```env
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=joti-foundation
```

**For MongoDB Atlas (Recommended for Production):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net
MONGODB_DB=joti-foundation
```

### 2. MongoDB Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. The database `joti-foundation` will be created automatically

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Create a database user
5. Get your connection string (without the database name)
6. Update `.env.local` with your connection string and database name

### 3. Database Structure
The form submissions are stored in a `contact` collection within the `joti-foundation` database with the following structure:

```typescript
{
  _id: ObjectId,
  name: string,
  email: string,
  phone: string,
  company: string,
  service: string,
  message: string,
  budget?: string,
  timeline?: string,
  createdAt: Date,
  status: 'new' | 'contacted' | 'in-progress' | 'completed'
}
```

### 4. Running the Application
```bash
npm run dev
```

The contact form is now available at the `/contact` section of your website.

## File Structure

```
src/
├── components/
│   └── ContactForm.tsx          # Main contact form component
├── lib/
│   └── mongodb.ts              # MongoDB connection utility
├── pages/
│   └── api/
│       └── contact.ts          # API endpoint for form submissions
├── types/
│   └── contact.ts              # TypeScript types and validation schema
└── pages/
    └── index.tsx               # Updated to include ContactForm
```

## Customization

### Design Modifications
The form uses Tailwind CSS classes that match your existing design system:
- Black and white color scheme
- Rounded corners and subtle shadows
- Hover effects and transitions
- Responsive grid layout

### Form Fields
To add/modify form fields:
1. Update the `contactFormSchema` in `src/types/contact.ts`
2. Add the field to the form in `src/components/ContactForm.tsx`
3. Update the API endpoint if needed

### Validation Rules
Modify validation rules in `src/types/contact.ts`:
```typescript
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  // Add your custom validation rules here
})
```

## Notifications

The form includes toast notifications for:
- ✅ Successful form submission
- ❌ Validation errors
- ❌ Network errors
- ❌ Server errors

## Testing

### Manual Testing
1. Fill out the form with valid data
2. Submit and verify success notification
3. Test validation by submitting incomplete data
4. Test network errors by disconnecting internet

### Database Verification
Check your MongoDB database to ensure submissions are being stored:
```javascript
// In MongoDB shell or Atlas
use joti-foundation
db.contact.find().sort({ createdAt: -1 })
```

## Security Considerations

1. **Environment Variables**: Never commit `.env.local` to version control
2. **Input Validation**: All inputs are validated both client-side and server-side
3. **Rate Limiting**: Consider adding rate limiting for production
4. **CORS**: Configure CORS if needed for your domain

## Production Deployment

1. Set up MongoDB Atlas for cloud database
2. Update environment variables in your hosting platform
3. Test the form in production environment
4. Monitor form submissions and error logs

## Support

If you encounter any issues:
1. Check the browser console for client-side errors
2. Check the server logs for API errors
3. Verify MongoDB connection and permissions
4. Ensure all environment variables are set correctly

## Next Steps

Consider adding:
- Email notifications for new submissions
- Admin dashboard to view submissions
- Form analytics and tracking
- Integration with CRM systems
- File upload functionality
