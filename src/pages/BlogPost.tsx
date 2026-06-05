import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Sample blog post content
const postsContent: Record<string, { title: string; date: string; category: string; content: string[] }> = {
  "exist-without-performing": {
    title: "I'm learning to exist without performing",
    date: "June 02, 2026",
    category: "Healing",
    content: [
      "I spent so long curating how I showed up that I forgot what it felt like to just.. be.",
      "Be present without narrating it. Be happy without proving it. Be quiet without it meaning something was wrong.",
      "There was always an audience in my mind. Even when no one was watching, I was still performing.. adjusting my reactions, choosing words carefully, making sure the version of me that people saw was acceptable. Lovable. Easy.",
      "But performing is exhausting when it never ends.",
      "So I stopped.",
      "Not in one big moment. Just in small, repeated choices. Letting myself sit in silence without filling it. Letting my face rest without smiling on command. Letting a moment pass without documenting it or explaining it to anyone.",
      "And something unexpected happened.. I started to feel more like myself than I have in years.",
      "Not the version I built for others. Not the version that made everyone comfortable. Just me. Unfiltered. Unpolished. Unperformed.",
      "It's quieter here. But it's honest.",
      "And I think I'd rather be quietly real than loudly curated.",
      "This is what it feels like to finally stop auditioning for your own life.",
    ]
  },
  "stopped-shrinking": {
    title: "This is the season I stopped shrinking",
    date: "May 26, 2026",
    category: "Life",
    content: [
      "For years, I made myself smaller.",
      "Smaller opinions. Smaller needs. Smaller presence. I folded into rooms instead of entering them. I whispered my ideas instead of speaking them. I convinced myself that taking up less space was a kindness to everyone else.",
      "But it wasn't kindness. It was fear.",
      "Fear that I was too much. Fear that my fullness would inconvenience someone. Fear that if I showed up completely, I'd be rejected completely.",
      "This season, something changed.",
      "I stopped apologizing for having needs. I stopped shrinking my voice to match the comfort levels of people who never adjusted theirs for me. I stopped performing smallness to be palatable.",
      "And the world didn't end.",
      "In fact, it opened.",
      "The right people leaned in closer. The right opportunities began to find me. The version of myself I'd been protecting started to breathe.. fully, freely, without permission.",
      "I'm not loud about it. I'm not making a scene. But I'm here. All of me. Taking up the space I spent years giving away.",
      "This isn't arrogance. It's arrival.",
      "And I think this is the version of me I was always becoming.. the one who stops shrinking and starts living.",
      "Finally.",
    ]
  },
  "gratitude-for-me": {
    title: "Gratitude for the version of me who kept going",
    date: "May 19, 2026",
    category: "Healing",
    content: [
      "I don't say this to her enough.",
      "The version of me who woke up on the hardest mornings and still showed up. The one who cried in private and smiled in public because she didn't know what else to do. The one who made messy decisions, loved the wrong things, and still.. somehow.. kept going.",
      "She didn't always get it right. She stayed too long in places that hurt her. She gave too much to people who didn't give back. She silenced herself when she should have spoken and spoke when she should have walked away.",
      "But she survived every single thing that tried to break her.",
      "And I'm here because of her.",
      "I think sometimes in the rush to become better, we forget to honor the versions of us that carried us through the worst of it. We're so focused on who we're becoming that we forget to thank who we were.",
      "So this is for her. For me. For every version that existed between then and now.",
      "Thank you for not giving up.. even when you wanted to. Thank you for choosing yourself.. even when it was terrifying. Thank you for trusting that something better was coming.. even when you couldn't see it.",
      "You were doing so much more than you knew.",
      "And I carry you with me. Gently. Gratefully. Always.",
    ]
  },
  "dont-need-to-prove": {
    title: "I don't need to prove I've changed",
    date: "May 12, 2026",
    category: "Thoughts",
    content: [
      "There was a time when I wanted everyone to see my growth.",
      "I wanted to explain the work I'd done. The patterns I'd broken. The ways I'd healed. As if growth only mattered when someone acknowledged it.",
      "But I've been sitting with a different truth lately.",
      "The people who are meant to notice will. And the ones who don't.. that's not my burden to carry.",
      "I don't need to narrate my healing to validate it. I don't need to perform my growth for it to be real. The changes I've made aren't for anyone's approval. They're for me.",
      "And that's been one of the harder things to accept.. that some of the most important work you'll ever do will go completely unseen. That you might grow in ways no one claps for. That your healing might look, from the outside, like nothing at all.",
      "But you'll know. In how you sleep at night. In how you speak to yourself. In how you walk away from things that no longer serve you without looking back.",
      "Growth doesn't need a stage. It doesn't need applause.",
      "It just needs you to keep going.. even when no one is watching.",
      "And I am. Quietly. Faithfully. For myself.",
    ]
  },
  "what-peace-looks-like": {
    title: "What peace actually looks like for me",
    date: "May 5, 2026",
    category: "Healing",
    content: [
      "For a long time, I imagined peace as the absence of problems.",
      "A life where everything was settled. Where I had answers to every question and clarity in every direction. Where nothing was uncertain and nothing hurt.",
      "But that's not peace. That's a fantasy.",
      "Real peace.. the kind I've been slowly building.. looks much different than I expected.",
      "It looks like waking up and not immediately dreading the day. It looks like setting a boundary and not apologizing for it an hour later. It looks like hearing something that would've once shattered me and feeling it pass through without leaving a permanent mark.",
      "Peace looks like choosing not to respond to every provocation. Like letting someone misunderstand me without launching into a defense. Like trusting that time will reveal what words cannot.",
      "It's not perfect. It's not constant. There are still moments where the noise gets loud and the old patterns try to resurface.",
      "But the difference now is that I can recognize them. I can pause. I can choose differently.",
      "Peace isn't something I've arrived at. It's something I practice. Daily. Imperfectly. Intentionally.",
      "And this version of peace.. messy, honest, hard earned.. feels more real than the one I used to chase.",
    ]
  },
  "no-longer-that-version": {
    title: "I'm no longer the version they remember",
    date: "April 28, 2026",
    category: "Healing",
    content: [
      "Some people still see the old me when they look at me.",
      "The one who apologized too much. The one who stayed too long. The one who made herself smaller to make others comfortable.",
      "And I understand. That was the version they knew. That was the version they built their expectations around.",
      "But she's not here anymore. Not fully.",
      "I've changed in ways that aren't always visible from the outside. The boundaries I've set. The things I've stopped tolerating. The silence I now choose instead of the explanations I used to offer.",
      "Not everyone will understand this version of me. Some will miss the one who was easier to navigate. Some will confuse my growth with distance. Some will feel like I've changed too much.",
      "And maybe I have. But I didn't change to make a statement. I changed because the old way of being was costing me more than I could afford.",
      "I don't owe anyone the version of me they're most comfortable with.",
      "Growth means some people will need to get to know you again. And some won't want to. That's okay.",
      "I'd rather be misunderstood and aligned than familiar and empty.",
      "This version of me isn't perfect. But she's honest. And that matters more to me now than being easy to love.",
    ]
  },
  "quiet-monday": {
    title: "A quiet Monday that felt like healing",
    date: "April 21, 2026",
    category: "Random",
    content: [
      "Nothing significant happened today.",
      "I woke up slowly. Made tea instead of coffee. Opened the window and let the morning air sit in the room before I did anything else.",
      "I didn't check my phone for the first twenty minutes. Not because I was being disciplined, but because I genuinely forgot. And when I realized that, I smiled.",
      "There was laundry to do, so I did it. There was a song I'd been meaning to listen to, so I played it twice. I had lunch alone and didn't feel the need to fill the silence with anything.",
      "It was just a Monday. Ordinary in every way.",
      "But something about it felt different. Like I was actually in it.. not ahead of it, not behind it, not wishing it were something else.",
      "I think that's what healing looks like sometimes. Not breakthroughs. Not revelations. Just a regular day where you realize you're not carrying as much as you used to.",
      "Where you notice that the heaviness has become lighter without you trying to fix it.",
      "It's a quiet Monday. And I'm here for it. Fully, gently, without wishing I were somewhere else.",
      "Maybe that's enough. Maybe that's everything.",
    ]
  },
  "softness-not-weakness": {
    title: "Softness is not weakness",
    date: "April 14, 2026",
    category: "Thoughts",
    content: [
      "Somewhere along the way, I learned to harden.",
      "To respond quickly. To protect myself with distance. To mistake sharpness for strength and vulnerability for risk.",
      "It kept me safe for a while. But it also kept me small.",
      "Because when you build walls around your softness, you don't just keep the hurt out.. you keep the connection out too. The tenderness. The moments that require you to be open, even when it's uncomfortable.",
      "I'm unlearning that now.",
      "Not all at once, but slowly. Letting myself be moved by things again. Letting people see the gentler parts of me without assuming they'll use them against me.",
      "Softness is not naivety. It's not weakness. It's the courage to remain open in a world that constantly tells you to guard yourself.",
      "It's choosing kindness when cynicism would be easier. It's offering grace when judgment is more convenient. It's staying tender with yourself even on the days you feel like you should be tougher.",
      "I don't want to be hard anymore. I don't want strength that costs me my warmth.",
      "I want to be soft and steady. Gentle and grounded. Open and still safe.",
      "Maybe that's the strongest thing I've ever chosen.",
    ]
  },
  "enjoy-without-guilt": {
    title: "Allowing myself to enjoy things without guilt",
    date: "April 7, 2026",
    category: "Life",
    content: [
      "I caught myself smiling the other day.. genuinely, without thinking.. and my first instinct was to question it.",
      "As if joy needed justification. As if I hadn't earned the right to feel light.",
      "I've done that for longer than I'd like to admit. Enjoyed something and then immediately wondered if I should be doing something more productive. Laughed freely and then pulled myself back, as though happiness was something to ration.",
      "But I'm tired of that pattern.",
      "I'm tired of treating rest like laziness. Of feeling guilty for an afternoon spent doing nothing useful. Of believing that I need to be in constant motion to deserve the good things.",
      "So I'm practicing something new. Allowing.",
      "Allowing myself to enjoy a slow morning without calling it wasted. Allowing myself to buy the thing I like without justifying the price. Allowing myself to feel happy in ordinary, unremarkable moments without questioning whether it will last.",
      "Joy doesn't need to be earned. It's not a reward for suffering long enough. It's just part of living.. and I've been holding it at arm's length for too long.",
      "This season, I'm letting it in. Fully. Without apology.",
      "And it feels like a kind of freedom I didn't know I needed.",
    ]
  },
  "stopped-waiting": {
    title: "I stopped waiting for the right moment",
    date: "March 31, 2026",
    category: "Healing",
    content: [
      "I spent a long time waiting.",
      "Waiting to feel ready. Waiting for the fear to pass. Waiting for some invisible signal that it was finally okay to move.",
      "But the signal never came. Not the way I imagined it would.",
      "There was no sudden clarity. No morning where I woke up and everything made sense. Just a slow, quiet realization that the right moment isn't something you find.. it's something you decide.",
      "So I started deciding.",
      "Not loudly. Not dramatically. Just one small choice at a time. Speaking when I would have stayed silent. Showing up when I wanted to hide. Doing the thing I'd been putting off.. not because the fear disappeared, but because I stopped letting it make my decisions.",
      "The truth is, I may never feel completely ready. For anything. But I don't want to spend another season watching life from the edges, waiting for a confidence that only comes from doing the things that scare you.",
      "Imperfect action still moves you forward. Messy beginnings still count.",
      "I'd rather be someone who tried before she was ready than someone who waited until the moment had already passed.",
      "And maybe that's its own kind of healing.. learning to trust yourself enough to begin.",
    ]
  },
  "people-who-stay": {
    title: "The people who stay don't need convincing",
    date: "March 24, 2026",
    category: "Healing",
    content: [
      "I used to exhaust myself trying to keep people close.",
      "Explaining my feelings so they'd understand. Adjusting my tone so they wouldn't leave. Dimming parts of myself so I'd be easier to love. I thought that was what connection required.. constant maintenance, constant proof that I was worth staying for.",
      "But the people who truly stay don't need any of that.",
      "They don't need you to perform your value. They don't need weekly reassurance that you care. They don't keep score.",
      "They just stay. Quietly. Consistently. In a way that doesn't ask you to shrink.",
      "I've been noticing this more lately. The difference between people who choose you and people who tolerate you. Between people who meet you where you are and people who only show up when you meet them where they want you to be.",
      "It's a painful distinction to make. But it's a necessary one.",
      "Because once you stop pouring into connections that only flow one way, you realize how much energy you have for the ones that actually fill you up.",
      "The right people don't need convincing. They don't need you to chase. They see you.. even in your quiet seasons.. and they stay anyway.",
      "And I'm learning to trust that. To stop holding so tightly to what wants to leave, and to open my hands toward what chooses to remain.",
      "That shift has changed everything.",
    ]
  },
  "spring-before-ready": {
    title: "Spring came before I felt ready",
    date: "March 17, 2026",
    category: "Life",
    content: [
      "The weather changed before I did.",
      "One morning the light came through the window differently.. warmer, softer, almost insistent.. and I realized the season had moved on without waiting for me to catch up.",
      "I was still sitting with winter thoughts. Still processing. Still holding things I hadn't fully unpacked. And suddenly the world outside was blooming, stretching, waking up.",
      "It felt unfair at first. Like I was being asked to match an energy I hadn't arrived at yet.",
      "But maybe that's the thing about seasons. They don't wait for permission. They come, and they invite you to move with them.. not perfectly, just honestly.",
      "I don't feel fully ready for spring. For lightness. For the version of me that this season is calling forward. But I'm learning that readiness isn't a requirement. Willingness is.",
      "So I'm opening the windows. I'm letting the air in. I'm allowing myself to bloom at my own pace, even if the flowers outside are already ahead of me.",
      "Maybe growth doesn't need you to be ready. Maybe it just needs you to not resist it.",
      "And today, I'm choosing not to resist.",
    ]
  },
  "my-own-company": {
    title: "I'm starting to feel at home in my own company",
    date: "March 10, 2026",
    category: "Thoughts",
    content: [
      "There was a time when being alone felt like something was missing.",
      "Like silence was a gap that needed filling. Like spending an evening with just myself meant I was somehow falling behind on life. I'd reach for my phone, scroll, distract.. anything to avoid sitting still with my own thoughts.",
      "But lately, something has shifted.",
      "I've started looking forward to my own company. Not in a way that shuts people out, but in a way that finally lets me in.",
      "I cook for myself now and actually enjoy it. I take walks without music sometimes, just to hear what my mind is thinking. I sit with my morning coffee a little longer, not because I have nowhere to be, but because I want to be here.. fully.. before the day begins.",
      "There's a difference between being alone and being lonely. I used to blur those lines. Now I see them clearly.",
      "Loneliness is the ache of disconnection. Solitude is the comfort of reconnection.. with yourself.",
      "I think for a long time I was looking for home in other people, in places, in plans. And maybe I needed to. Maybe that searching taught me what to look for.",
      "But right now, in this season, home feels like something I carry with me. In the stillness. In the quiet. In the version of me who no longer needs noise to feel whole.",
      "And that feels like enough.",
    ]
  },
  "quiet-shifts": {
    title: "Some shifts don't need to be announced",
    date: "March 3, 2026",
    category: "Healing",
    content: [
      "There are changes happening inside me that I don't know how to explain yet.",
      "Not the kind that come with a moment you can point to. Not the kind that make for good stories. Just quiet, steady rearranging.",
      "I notice it in small ways. The things that used to bother me don't land the same. The conversations I would have replayed for days now pass through me gently. The need to be understood by everyone has softened into something more honest.. a need to understand myself.",
      "I used to think growth had to be visible to count. That if no one noticed, maybe it wasn't real. But I'm learning that the most meaningful shifts are the ones that happen between you and yourself. No audience required.",
      "Something in me has changed. I can't fully name it. But I feel it in how I move, how I respond, how I let things be without needing to control what comes next.",
      "Maybe not every transformation needs a title. Maybe some of the most important ones happen so quietly that even you don't notice until you look back and realize.. you're not the same person who started this year.",
      "And that's not something I need to announce. It's something I get to carry.",
      "Quietly. Gently. Mine.",
    ]
  },
  "no-force": {
    title: "I no longer force what doesn't flow",
    date: "February 24, 2026",
    category: "Healing",
    content: [
      "There was a time I believed effort could fix everything.",
      "If something felt distant, I tried harder.", "If something felt unclear, I overexplained.", "If something felt unstable, I tightened my grip.",
      "I thought persistence meant strength.",
      "But lately, I’ve been noticing something different.",
      "What is meant for me doesn’t require convincing.", "It doesn’t need constant adjustment.", "It doesn’t make me question my worth just to stay.",
      "I’m no longer forcing conversations that feel strained.",
      "I’m no longer stretching myself to maintain connections that feel one-sided.",
      "I’m no longer chasing clarity from people who are comfortable giving confusion.",
      "This doesn’t come from bitterness. It comes from peace.",
      "When you begin trusting yourself and protecting your energy, something shifts. You stop negotiating with what already feels misaligned. You stop trying to prove your value in rooms where you feel unseen.",
      "Flow feels lighter. Flow feels mutual. Flow feels calm.",
      "And I’m choosing that now.",
      "Not because I don’t care but because I finally care about my own alignment just as much.",
      "There’s strength in allowing things to be what they are. There’s maturity in stepping back instead of pushing forward. There’s clarity in not forcing what isn’t naturally unfolding.",
      "This month hasn’t made me louder. It’s made me steadier.",
      "And steadiness feels like growth.",
    ]
  },

  "calm-me": {
    title: "I feel calmer in ways I can't fully explain",
    date: "February 19, 2026",
    category: "Healing",
    content: [
      "There’s a kind of calm that doesn’t come from everything being perfect.",
      "It comes from no longer arguing with yourself about what you already know.",
      "Lately, I’ve noticed that I don’t react the way I used to. Situations that once unsettled me now feel quieter. Conversations that would have stayed in my head for days now pass through me without needing to be replayed.",
      "Nothing dramatic happened. No sudden breakthrough. Just small decisions, repeated quietly.",
      "Choosing not to overexplain. Choosing not to chase reassurance. Choosing to pause instead of immediately responding to every feeling that rises.",
      "And somewhere in those pauses, something shifted.",
      "I feel calmer, not because life is easier, but because I’m steadier. Because I trust my responses more. Because I no longer feel the need to prove my intentions or defend my boundaries once I’ve set them.",
      "This calm feels unfamiliar at times. Almost like I’m meeting a version of myself who isn’t constantly questioning whether she’s allowed to feel the way she does.",
      "I still care deeply. I still notice everything. But I don’t carry it all the same way anymore.",
      "There’s a quiet confidence growing. The kind that doesn’t need to be announced. The kind that shows up in how I move, how I decide, and how I let certain things simply be.",
      "Maybe this is what happens when you start trusting yourself and protecting your energy at the same time. You don’t become distant. You become grounded.",
      "And grounding feels a lot like peace.",
    ]
  },
  "selective-energy": {
    title: "I’m becoming more selective with my energy",
    date: "February 12, 2026",
    category: "Healing",
    content: [
      "Lately, I’ve been paying attention to how my body reacts before my mind has time to explain it away.",
      "What feels light. What feels heavy.",
      "What quietly asks for distance.",
      "This isn’t about shutting people out. It’s about listening more closely.",
      "As I learn to trust myself again, I’m also learning that not everything deserves my energy. Not every conversation needs a response. Not every situation requires my presence just because it always has.",
      "There’s a difference between being available and being aligned.",
      "I used to think protecting my energy meant being cold or distant. Now I see it as care. For myself, and for the relationships I choose to keep. Showing up fully requires knowing where you don’t need to.",
      "This season feels less emotional and more intentional. Less reactive. More discerning.",
      "I’m no longer forcing connections that feel strained, or explaining why I need space. I’m letting my choices speak quietly, and trusting that the right people will understand or not need an explanation at all.",
      "There’s peace in this kind of selectiveness. A calm confidence that doesn’t ask to be validated.",
      "And maybe this is what growth looks like now. Not becoming more open but becoming more honest about where I belong.",
    ],
  },
  "trust-myself": {
    title: "I’m learning to trust myself again",
    date: "February 04, 2026",
    category: "Healing",
    content: [
      "For a long time, I questioned myself more than I listened",
      "I looked outward for confirmation. For reassurance. For signs that I was doing the right thing.",
      "Somewhere along the way, I stopped trusting the quiet voice inside me ... the one that already knew.",
      "Lately, I’ve been learning how to listen again. Not loudly. Not dramatically. Just honestly.",
      "Trusting myself doesn’t mean I never feel unsure.",
      "It means I pause before doubting myself. It means I give my instincts room to speak before I silence them.",
      "There’s a calm that comes with this kind of trust. A steadiness. A sense of grounding I didn’t know I was missing.",
      "I’m not asking for permission anymore. I’m paying attention.",
      "And that feels like progress.",
    ],
  },
  "slow-down": {
    title: "January taught me to slow down",
    date: "January 27, 2026",
    category: "Healing",
    content: [
      "I entered January expecting movement.",
      "Not loud movement; but something. A sign. A shift I could name.",
      "I thought the beginning of a new year would meet me with clarity, or at least a sense of direction. Instead, it met me with stillness. The kind that makes you uncomfortable at first because there’s nowhere to hide from your thoughts.",
      "There were days this month where I felt behind. Like everyone else had already stepped into the year with purpose, while I was still sitting with unanswered questions. And for a moment, I wondered if I was doing something wrong.",
      "But January didn’t rush me. It asked me to stay.",
      "It slowed me down enough to notice how often I mistake urgency for growth. How easily I pressure myself to move just so I don’t feel stuck. This month reminded me that not moving is sometimes the most honest thing you can do.",
      "I learned that rest isn’t something you earn after proving your worth. It’s something you choose when you finally start listening to yourself.",
      "Some days were quiet. Some days felt heavy. Some days I didn’t have the words, only the feeling that something inside me was rearranging.",
      "And I let it.",
      "I’m ending January without answers neatly lined up. There are still things unfolding. Still emotions I haven’t named yet. But I feel lighter.",
      "Not because everything is resolved but because I stopped forcing myself to be ready before I actually was.",
      "If this is how the year begins, then maybe growth doesn’t need pressure.Maybe becoming doesn’t need a deadline.Maybe it doesn’t need to be seen at all.",
      "Maybe it just needs space. And for the first time in a long time.",
      "I’m allowing myself to take it.",
    ],
  },
  "choose-myself": {
    title: "I’m learning to choose myself without explaining",
    date: "January 20, 2026",
    category: "Healing",
    content: [
      "For a long time, choosing myself came with guilt.",
      "I felt the need to soften my decisions, to explain them carefully, to make sure no one felt uncomfortable because of my growth. As if protecting my peace required permission.",
      "But lately, something has shifted.",
      "I’m learning that choosing myself doesn’t have to be loud or defensive. It doesn’t need a speech. It doesn’t need to be justified.",
      "Some boundaries don’t come with warnings. Some decisions are made quietly. And some versions of me don’t exist to be understood by everyone.",
      "I used to think that being kind meant always being available. Now I know it also means being honest with myself.",
      "Choosing myself doesn’t mean I care less. It means I’m listening more closely to what I need.",
      "And maybe that’s what growth looks like. Making choices that feel aligned, even when they’re not explained.",
      "For now, I’m allowing myself that freedom.",
      "Maybe this is part of becoming.",
    ],
  },
  "version-of-me": {
    title: "The version of me feels unfamiliar, and that's okay",
    date: "January 13, 2026",
    category: "Healing",
    content: [
      "Lately, I’ve been meeting a version of myself I don’t fully recognize.",
      "She reacts differently. She pauses instead of explaining. She chooses rest without guilt.", "At first, it felt uncomfortable — like I was losing parts of who I used to be. But maybe I’m not losing anything. Maybe I’m just shedding what no longer fits.",
      "Growth doesn’t always feel empowering. Sometimes it feels quiet. Sometimes it feels lonely. Sometimes it feels like standing in between who you were and who you’re becoming.",
      "I don’t have everything figured out. But I know this version of me listens more to her intuition than her fear. She doesn’t chase validation the way she used to. She doesn’t stay where she feels small.",
      "And even if she feels unfamiliar, she feels honest.",
      "I’m learning to trust this shift — even when it doesn’t come with clarity. Even when it feels slow. Even when it scares me a little.",
      "Because maybe becoming isn’t about finding yourself. Maybe it’s about allowing yourself to change.",
      "And for now, that’s enough.",
      "Maybe this is part of becoming.",
    ],
  },
  "behind-guilt": {
    title: "What I'm leaving behind without guilt",
    date: "January 08, 2026",
    category: "Healing",
    content: [
      "The new year didn’t arrive with clarity. It arrived with silence.",
      "After the countdown ended and the noise settled, I realized something — not everything needs to come with me.",
      "I’m leaving behind the need to explain myself. The habit of staying where I feel tolerated, not chosen. The guilt that comes with choosing rest over proving my worth.",
      "Some things were never meant to be carried into a new year. They did their job. They taught me. And now, they can stay where they belong — in the past.",
      "I used to think letting go required answers. Now I know it only requires honesty.",
      "Honesty with myself. Honesty about what drains me. Honesty about what no longer feels aligned.",
      "This year, I’m choosing to move forward lighter. Not because I’ve healed everything, but because I’m done punishing myself for what I didn’t know back then.",
      "I don’t need closure from everyone. I don’t need permission to grow. Some things end quietly. And maybe that’s the most peaceful way.",
    ],
  },
  "new-beginnings": {
    title: "Welcoming 2026 with an open heart",
    date: "December 31, 2025",
    category: "Life",
    content: [
      "There’s something quiet about the moment you decide to let go.",
      "Not loudly. Not dramatically. Just a soft understanding that some chapters have already ended — even if you kept rereading them.",
      "As 2026 begins, I’m choosing not to carry what no longer fits. The versions of me that stayed too long. The lessons that were learned the hard way. The feelings that once needed answers but now only need release.",
      "I’m not entering this year with a checklist of resolutions. I’m entering it with space.",
      "Space for new beginnings. Space for softness. Space for things I don’t fully understand yet.",
      "2025 taught me how to survive. 2026 feels like learning how to live again.",
      "I don’t need everything to be clear. I just need my heart open enough to receive what’s meant for me.",
      "So here’s to closing old chapters with gratitude — not bitterness. And opening new ones with courage — not fear.",
      "This year, I choose beginnings. Even if they start quietly.",
    ],
  },
  "strong-days": {
    title: "Some days I'm strong, some days I'm just tired",
    date: "December 30, 2025",
    category: "Healing",
    content: [
      "I’ve learned that strength doesn’t always look loud.",
      "Some days, it’s simply getting through the day without explaining why you feel heavy. Without justifying your silence. Without forcing yourself to be okay for the comfort of others.",
      "I used to think being strong meant always having answers. Now I know it sometimes means allowing yourself not to have them.",
      "There are days I feel grounded, clear, and confident. And there are days where everything feels heavier than it should.",
      "I’m learning not to judge either version of myself.",
      "Maybe strength is letting both exist. Maybe healing doesn’t need to be rushed.Maybe becoming takes time.",
      "And today, I’m allowing that.",
    ],
  },
  "embrace-quiet-moments": {
    title: "Learning to embrace the quiet moments",
    date: "December 28, 2025",
    category: "Thoughts",
    content: [
      "There's something profoundly beautiful about sitting with silence. Not the uncomfortable kind that begs to be filled, but the kind that wraps around you like a warm blanket on a winter evening.",
      "I've spent so much of my life afraid of stillness. Afraid that in the quiet, I would have to face the thoughts I'd been running from. Afraid that without noise, I would feel truly alone.",
      "But lately, I've been learning to sit with myself. To let the silence speak. And what I've found is not emptiness, but fullness—a richness that only comes when we stop trying to fill every moment with something.",
      "The quiet moments are where I've found my truest thoughts. The ones that don't come with the rush of daily life, but only emerge when given the space to breathe.",
      "It's in these moments that I've learned the most about who I am and who I want to become. Not through doing, but through being. Not through noise, but through the gentle whisper of stillness.",
      "If you're afraid of the quiet like I was, I hope you'll give it a chance. Start small—five minutes with your morning coffee, a walk without headphones, an evening without screens. Let yourself be uncomfortable at first. The beauty comes after.",
    ],
  },
  "growing-through-change": {
    title: "On growing through change",
    date: "December 20, 2025",
    category: "Healing",
    content: [
      "Change has always felt like losing pieces of myself. Every transition, every ending, every new beginning—they all seemed to take something from me.",
      "But lately, I've started to see it differently. What if change isn't about losing pieces, but about collecting new ones? Adding to who I am rather than subtracting from it.",
      "The person I was before this year isn't gone. She's still here, woven into the fabric of who I am now. But she's joined by new versions of me—the one who learned to let go, the one who found courage she didn't know she had, the one who is still figuring it out.",
      "Growth isn't linear. It's messy and circular and sometimes it feels like you're moving backward when you're actually spiraling upward. Trust the spiral.",
      "Every version of you matters. Every version of you was doing their best with what they had. Honor them as you grow into who you're becoming.",
    ],
  },
  "letters-never-sent": {
    title: "Letters I never sent",
    date: "December 15, 2025",
    category: "Life",
    content: [
      "Sometimes the most important conversations happen in the space between what we say and what we mean. These are the words I've been holding onto.",
      "To the friend I grew apart from: I think about you more than you know. I see things that remind me of our inside jokes, and I smile even though it aches a little. Growing up doesn't mean growing apart had to happen, but it did, and I'm learning to hold both the gratitude and the grief.",
      "To the version of me who was afraid: You did so much more than you give yourself credit for. Every small step you took when you wanted to run, every time you chose to stay when it would have been easier to leave—it mattered. It all mattered.",
      "To the future I can't see yet: I trust you're forming even now. In the quiet moments and the chaotic ones. In the decisions that feel impossible and the ones that feel inevitable. Keep becoming.",
      "These letters may never reach their intended recipients. But maybe that's okay. Maybe some words are meant to be released into the universe, not delivered to a doorstep.",
    ],
  },
  "random-tuesday": {
    title: "A random Tuesday in December",
    date: "December 10, 2025",
    category: "Random",
    content: [
      "Not every day needs to be remarkable. Sometimes the most beautiful moments are the ones that pass without fanfare.",
      "Today was a random Tuesday. I woke up later than intended, made coffee that was slightly too strong, and spent the morning doing nothing of particular importance.",
      "I watched the way the winter light fell through my window and noticed, for the first time, how it makes everything look softer. Kinder, somehow.",
      "I had a conversation with a stranger at the grocery store about the best way to pick a ripe avocado. Neither of us knew the answer, but we laughed about it.",
      "These are the moments that make up a life. Not the big milestones or the Instagram-worthy experiences, but the small, unremarkable Tuesdays that somehow become the backdrop to our most treasured memories.",
      "Here's to the random Tuesdays. May we have many more of them.",
    ],
  },
  "art-of-letting-go": {
    title: "The art of letting go",
    date: "December 5, 2025",
    category: "Healing",
    content: [
      "Letting go doesn't mean forgetting. It means making peace with the memories, allowing them to exist without the weight of what could have been.",
      "I used to think letting go meant erasing. Deleting photos, throwing away gifts, pretending the past didn't happen. But that's not letting go—that's running away.",
      "True release is gentler than that. It's looking at the memory and saying, 'Thank you for what you taught me. You can stay, but you no longer control me.'",
      "The art of letting go is not in the grand gestures of closure, but in the quiet daily choices to not let the past define your present.",
      "Some days are harder than others. Some memories have sharper edges. But with practice, we learn to hold them without bleeding.",
    ],
  },
  "midnight-conversations": {
    title: "Midnight conversations with myself",
    date: "November 28, 2025",
    category: "Thoughts",
    content: [
      "There's honesty that only comes out at 2 AM, when the world is asleep and you're left with nothing but your thoughts and the soft glow of a bedside lamp.",
      "It's in these midnight hours that I have my most important conversations—not with others, but with myself.",
      "What do you really want? What are you afraid of? What would you do if fear wasn't a factor?",
      "The answers that come in the darkness are often different from the ones we give in daylight. They're rawer, more honest, sometimes harder to hear.",
      "But I've learned to listen to my midnight self. She knows things my daytime self is too busy to notice.",
      "If you find yourself awake at 2 AM, maybe instead of scrolling or worrying, try asking yourself the questions you've been avoiding. You might be surprised by what you discover.",
    ],
  },
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? postsContent[slug] : null;

  if (!post) {
    return (
      <Layout>
        <section className="py-section">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <h1 className="font-serif text-3xl mb-4">Post not found</h1>
            <Button variant="journal" size="journal" asChild>
              <Link to="/blog">Back to journal</Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Back Link */}
      <section className="pt-8 lg:pt-12">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm tracking-wide">Back to journal</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Post Header */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            {/* Category & Date */}
            <div className="flex items-center justify-center gap-4 text-xs tracking-widest uppercase text-muted-foreground animate-fade-in">
              <span className="text-dusty-rose">{post.category}</span>
              <span className="w-8 h-px bg-border"></span>
              <time>{post.date}</time>
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight animate-fade-in-up">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Post Content */}
      <section className="pb-section">
        <div className="container mx-auto px-6 lg:px-12">
          <article className="max-w-2xl mx-auto prose-journal">
            {post.content.map((paragraph, index) => (
              <p
                key={index}
                className="text-foreground/90 leading-relaxed opacity-0 animate-fade-in mb-0 text-justify"
                style={{ animationDelay: `${0.3 + index * 0.1}s`, animationFillMode: "forwards" }}
              >
                {paragraph}
              </p>
            ))}
          </article>
        </div>
      </section>

      {/* End Flourish */}
      <section className="pb-section">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-2xl text-dusty-rose">✦</span>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
