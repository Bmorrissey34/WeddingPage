# Firebase Rules Notes

## Deploying the rules

This repo now includes [firestore.rules](/abs/path/c:/Users/brend/Downloads/wedding-website-design/firestore.rules:1) and a matching [firebase.json](/abs/path/c:/Users/brend/Downloads/wedding-website-design/firebase.json:1).

To deploy the Firestore rules:

```bash
firebase login
firebase use <your-firebase-project-id>
firebase deploy --only firestore:rules
```

If you prefer not to switch projects locally, you can deploy directly with:

```bash
firebase deploy --only firestore:rules --project <your-firebase-project-id>
```

## What guests can do

- Guests can create new documents in the `rsvps` collection.
- Guests do not need Firebase accounts.
- Guests cannot read RSVP records.
- Guests cannot update RSVP records.
- Guests cannot delete RSVP records.

## What admins can do

- Any authenticated Firebase user is currently treated as an admin.
- Admins can read RSVP records.
- Admins can create RSVP records.
- Admins can update RSVP records.
- Admins can delete RSVP records.

## Before going live

- Replace the broad "any authenticated user is admin" rule with something tighter.
- Preferred options are Firebase custom claims or a specific allowlist of approved admin user IDs or emails.
- Review whether public RSVP writes should enforce stricter validation for optional fields, party size ranges, and meal choices.
- Confirm App Check, monitoring, and audit logging are configured before the wedding site is live.
