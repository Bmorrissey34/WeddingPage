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
- Duplicate prevention currently uses a normalized email address as the RSVP document ID.
- Because public users cannot read RSVP records, the client cannot safely pre-check for duplicates.
- Instead, a second guest submission for the same normalized email is blocked by Firestore permissions and surfaced as a friendly duplicate RSVP message in the form.

## What admins can do

- Only the authenticated Firebase user with the email `brendanmorrissey34@gmail.com` is treated as an admin.
- Admins can read RSVP records.
- Admins can create RSVP records.
- Admins can update RSVP records.
- Admins can delete RSVP records.

## Before going live

- The current email allowlist is acceptable for a single-admin private wedding site.
- If this ever grows beyond one trusted admin, move to Firebase custom claims or a more structured admin allowlist.
- Review whether public RSVP writes should enforce stricter validation for optional fields, party size ranges, and meal choices.
- If you want guests to update their own RSVP later, add a secure server-side or claim-based flow rather than allowing public reads or public updates.
- Confirm App Check, monitoring, and audit logging are configured before the wedding site is live.
