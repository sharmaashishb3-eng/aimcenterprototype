export type UserRole = 'student' | 'teacher' | 'admin';

export type CourseStatus = 'draft' | 'pending_review' | 'published' | 'rejected';

export interface Profile {
    id: string;
    email: string;
    full_name: string;
    phone?: string;
    avatar_url?: string;
    role: UserRole;
    exam_preference?: string;
    created_at: string;
    updated_at: string;
}

export interface Course {
    id: string;
    title: string;
    slug: string;
    description?: string;
    category: string;
    price: number;
    original_price?: number;
    thumbnail_url?: string;
    features: string[];
    status: CourseStatus;
    created_by: string;
    reviewed_by?: string;
    review_notes?: string;
    created_at: string;
    updated_at: string;
    published_at?: string;
}

export interface CourseContent {
    id: string;
    course_id: string;
    title: string;
    type: 'module' | 'lesson' | 'video' | 'pdf';
    content?: string;
    video_url?: string;
    pdf_url?: string;
    order_index: number;
    duration_minutes?: number;
    created_at: string;
}

export interface Enrollment {
    id: string;
    user_id: string;
    course_id: string;
    enrolled_at: string;
    progress_percentage: number;
    completed_at?: string;
}

export interface TestSeries {
    id: string;
    title: string;
    description?: string;
    category: string;
    total_questions: number;
    duration_minutes: number;
    is_free: boolean;
    price: number;
    status: CourseStatus;
    created_by: string;
    created_at: string;
}

export interface Question {
    id: string;
    test_series_id: string;
    question_text: string;
    question_type: 'mcq' | 'fill_blank' | 'true_false';
    options: { id: string; text: string }[];
    correct_answer: string;
    explanation?: string;
    marks: number;
    negative_marks: number;
    order_index: number;
    created_by: string;
    created_at: string;
}

export interface TestAttempt {
    id: string;
    user_id: string;
    test_series_id: string;
    started_at: string;
    completed_at?: string;
    score?: number;
    total_marks?: number;
    answers: Record<string, string>;
    time_taken_seconds?: number;
}

export interface Payment {
    id: string;
    user_id: string;
    course_id?: string;
    test_series_id?: string;
    amount: number;
    currency: string;
    payment_provider: string;
    payment_id?: string;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    created_at: string;
}

// Database type for Supabase
export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: Profile;
                Insert: Omit<Profile, 'created_at' | 'updated_at'>;
                Update: Partial<Omit<Profile, 'id'>>;
            };
            courses: {
                Row: Course;
                Insert: Omit<Course, 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Omit<Course, 'id'>>;
            };
            course_content: {
                Row: CourseContent;
                Insert: Omit<CourseContent, 'id' | 'created_at'>;
                Update: Partial<Omit<CourseContent, 'id'>>;
            };
            enrollments: {
                Row: Enrollment;
                Insert: Omit<Enrollment, 'id' | 'enrolled_at'>;
                Update: Partial<Omit<Enrollment, 'id'>>;
            };
            test_series: {
                Row: TestSeries;
                Insert: Omit<TestSeries, 'id' | 'created_at'>;
                Update: Partial<Omit<TestSeries, 'id'>>;
            };
            questions: {
                Row: Question;
                Insert: Omit<Question, 'id' | 'created_at'>;
                Update: Partial<Omit<Question, 'id'>>;
            };
            test_attempts: {
                Row: TestAttempt;
                Insert: Omit<TestAttempt, 'id' | 'started_at'>;
                Update: Partial<Omit<TestAttempt, 'id'>>;
            };
            payments: {
                Row: Payment;
                Insert: Omit<Payment, 'id' | 'created_at'>;
                Update: Partial<Omit<Payment, 'id'>>;
            };
        };
    };
}
