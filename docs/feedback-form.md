# Google Form specification

Create the form in a Google account owned by the project team, then set `VITE_FEEDBACK_FORM_URL` and add the public URL to README.

## Questions

1. Name (optional if the team wants privacy-first responses)
2. Email (optional; explain why it is collected)
3. Midnight/Lace wallet address (optional; never publish the raw address)
4. Were you able to connect Lace? (Yes / No / Partially)
5. Were you able to complete the main feature? (Yes / No / Partially)
6. Did a testnet transaction complete? (Yes / No / Not attempted)
7. Product rating (1-5)
8. Ease of use (Very easy / Easy / Neutral / Difficult / Very difficult)
9. What did you like?
10. What problem did you face?
11. What feature should we build next?
12. Additional feedback

## Data handling

Tell respondents which fields are collected, why they are needed, and how long they will be retained. Export responses to a local file, remove names, emails, and full wallet addresses from the public dataset, and store only the anonymized workbook at `docs/user-feedback.xlsx`.
