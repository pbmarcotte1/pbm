Drop your media files here (audio, video, slides, images).

OpenAI usage is script-only for content generation. No API keys are used in browser code.
Set key in shell OR create .env.content from .env.content.example.

Examples:
- /media/my-talk.mp3
- /media/pricing-breakdown.mp4
- /media/case-deck.pdf

In app content, reference files with absolute paths like:
- audioUrl: '/media/my-talk.mp3'
- videoUrl: '/media/pricing-breakdown.mp4'

Generate transcript text files for mp3/mp4/wav/m4a:
- npm run transcribe -- public/media/my-talk.mp3

This writes to:
- /public/media/transcripts/my-talk.txt

Then add this in a work example entry:
- transcriptFileUrl: '/media/transcripts/my-talk.txt'

Generate a full editable work example from a file:
- npm run generate:work-example -- public/media/my-talk.mp3

This creates:
- /public/media/transcripts/my-talk.txt
- /src/content/workExamples/my-talk.ts

And updates:
- /src/content/workExamples/index.ts

New entries are generated with enabled: false so you can edit the text before publishing.
