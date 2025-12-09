/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: customerreviews
 * Interface for CustomerReviews
 */
export interface CustomerReviews {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  reviewContent?: string;
  /** @wixFieldType number */
  rating?: number;
  /** @wixFieldType text */
  reviewerName?: string;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
  /** @wixFieldType boolean */
  isVerified?: boolean;
  /** @wixFieldType text */
  guideReference?: string;
  /** @wixFieldType text */
  experienceReference?: string;
}


/**
 * Collection ID: servicebookings
 * Interface for ServiceBookings
 */
export interface ServiceBookings {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceName?: string;
  /** @wixFieldType text */
  providerPhoneNumber?: string;
  /** @wixFieldType text */
  providerName?: string;
  /** @wixFieldType text */
  customerName?: string;
  /** @wixFieldType text */
  customerEmail?: string;
  /** @wixFieldType date */
  bookingDate?: Date | string;
  /** @wixFieldType time */
  bookingTime?: any;
  /** @wixFieldType text */
  serviceAddress?: string;
  /** @wixFieldType text */
  bookingStatus?: string;
  /** @wixFieldType number */
  totalPrice?: number;
}


/**
 * Collection ID: serviceproviders
 * Interface for ServiceProviders
 */
export interface ServiceProviders {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  providerName?: string;
  /** @wixFieldType text */
  servicesOffered?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType image */
  profilePicture?: string;
  /** @wixFieldType text */
  bio?: string;
  /** @wixFieldType number */
  yearsOfExperience?: number;
  /** @wixFieldType boolean */
  isAvailable?: boolean;
  /** @wixFieldType text */
  specialties?: string;
  /** @wixFieldType number */
  rating?: number;
  /** @wixFieldType text */
  approvalStatus?: string;
  /** @wixFieldType datetime */
  approvalDate?: Date | string;
  /** @wixFieldType text */
  rejectionReason?: string;
}


/**
 * Collection ID: services
 * Interface for Services
 */
export interface Services {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceName?: string;
  /** @wixFieldType text */
  serviceType?: string;
  /** @wixFieldType text */
  summary?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType number */
  startingPrice?: number;
  /** @wixFieldType image */
  serviceImage?: string;
  /** @wixFieldType text */
  destination?: string;
  /** @wixFieldType text */
  duration?: string;
  /** @wixFieldType text */
  difficultyLevel?: string;
  /** @wixFieldType text */
  guideReference?: string;
}
