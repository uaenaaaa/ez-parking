export interface User {
    user_id: number;
    uuid: string;
    nickname?: string;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    suffix?: string;
    email: string;
    phone_number: string;
    role: 'admin' | 'user' | 'parking_manager';
    plate_number?: string;
}

export interface UserMinimal {
    created_at: string;
    email: string;
    first_name?: string;
    is_verified: boolean;
    last_name?: string;
    nickname?: string;
    phone_number?: string;
    plate_number?: string;
    role: string;
    user_id: number;
    middle_name? : string;
    uuid: string;
    suffix?: string;
}
