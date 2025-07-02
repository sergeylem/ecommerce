import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor(private configService: ConfigService) {
		const clientID = configService.get('GOOGLE_CLIENT_ID')
		const clientSecret = configService.get('GOOGLE_CLIENT_SECRET')
		const serverUrl = configService.get('SERVER_URL')

		if (!clientID || !clientSecret || !serverUrl) {
			throw new Error('Missing required Google OAuth environment variables')
		}

		super({
			clientID,
			clientSecret,
			callbackURL: serverUrl + '/auth/google/callback',
			scope: ['profile', 'email']
		})
	}

	async validate(
		_accessToken: string,
		_refreshToken: string,
		profile: Profile,
		done: VerifyCallback
	) {
		const { displayName, emails, photos } = profile

		if (!emails || !photos || emails.length === 0 || photos.length === 0) {
			return done(new Error('Email or photo not available from Google profile'), undefined)
		}

		const user = {
			email: emails[0].value,
			name: displayName,
			picture: photos[0].value
		}

		done(null, user)
	}
}
