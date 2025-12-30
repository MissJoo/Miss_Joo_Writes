import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Sample blog post content
const postsContent: Record<string, { title: string; date: string; category: string; content: string[] }> = {
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
                className="text-foreground/90 leading-relaxed opacity-0 animate-fade-in"
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
