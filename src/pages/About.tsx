import Layout from "@/components/layout/Layout";

const About = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="flex min-h-[calc(100svh-85px)] items-center bg-journal-bg py-12 md:min-h-[calc(100svh-5rem)] md:py-16">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] tracking-[0.3em] uppercase text-journal-gold font-sans font-medium block animate-fade-in">
              The Author
            </span>
            <h1 className="font-serif text-3.5xl md:text-5xl leading-tight text-journal-text animate-fade-in-up">
              Hello, I'm <span className="font-signature text-journal-gold font-normal not-italic tracking-normal text-3.5xl md:text-5xl block sm:inline mt-1 sm:mt-0">Joo</span>
            </h1>
            <div className="w-12 h-px bg-journal-champagne/40 mx-auto mt-4"></div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto space-y-6 text-journal-text-secondary leading-[1.8] font-sans text-[17px] md:text-[18px] font-light text-justify hyphens-auto sm:hyphens-manual">
            <p className="font-serif italic text-lg md:text-xl text-journal-text text-center border-b border-journal-border/30 pb-8 mb-8">
              “I created Miss Joo Writes because some feelings do not fit inside an Instagram caption.”
            </p>

            <p>
              Some thoughts need more space.<br />
              Some emotions need time before they make sense.<br />
              Some stories are too personal to be rushed, too layered to be posted and forgotten in a few seconds.
            </p>

            <p>
              For a long time, I carried so many things quietly: the lessons, heartbreaks, overthinking, growth, soft moments, heavy nights, and the kind of feelings I did not always know how to explain. Writing became the place where I could finally let them breathe.
            </p>

            <p className="font-medium text-journal-text">
              This space is my personal journal on the internet.
            </p>

            <p>
              It is where I write about becoming, healing, letting go, self-worth, love, silence, softness, and the small realizations that change us slowly. Not because I have everything figured out, but because I am still learning too.
            </p>

            <p className="border-l-[2px] border-journal-champagne pl-6 my-8 font-serif italic text-lg md:text-xl text-journal-gold leading-relaxed">
              I write for the version of me who felt too much.<br />
              The version of me who stayed longer than she should have.<br />
              The version of me who kept trying to understand everything.<br />
              And the version of me who is finally learning that peace matters too.
            </p>

            <p>
              Miss Joo Writes is not about perfect healing. It is about honest healing.
            </p>

            <p>
              The kind that happens quietly.<br />
              The kind that comes after confusion.<br />
              The kind that teaches you to come back to yourself, one thought at a time.
            </p>

            <p>
              Perhaps, as you read through these pages, you&rsquo;ll find thoughts that feel familiar, words for things you&rsquo;ve struggled to express, or perspectives that invite you to see things a little differently. I hope you find something here that makes you pause and feel understood.
            </p>

            <p>
              I hope this space reminds you that you are not alone in your thoughts.<br />
              You are not too emotional.<br />
              You are not behind.<br />
              You are simply becoming.
            </p>

            <p className="pt-4">
              Welcome to Miss Joo Writes, a quiet corner for feelings, reflections, healing, and the stories we are still learning how to tell.
            </p>

            <div className="pt-8 border-t border-journal-border/30 text-center mt-12 space-y-4">
              <p className="text-journal-gold font-serif text-xl md:text-2xl italic leading-relaxed max-w-lg mx-auto">
                “Some stories are not written because they are perfect. They are written because they are true.”
              </p>
              <div className="font-signature text-3xl text-journal-gold select-none pt-2">
                With softness, Miss Joo
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
