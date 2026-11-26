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
              Hello, I'm <span className="about-joo font-signature font-normal not-italic tracking-normal text-3.5xl md:text-5xl block sm:inline mt-1 sm:mt-0">Joo</span>
            </h1>
            <div className="w-12 h-px bg-journal-champagne/40 mx-auto mt-4"></div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto space-y-6 text-journal-text-secondary leading-[1.8] font-sans text-[17px] md:text-[18px] font-light text-left sm:text-justify">
            <p className="font-serif italic text-lg md:text-xl text-journal-text text-center border-b border-journal-border/30 pb-8 mb-8">
              &ldquo;I created Miss Joo Writes because some feelings don&rsquo;t fit inside an Instagram caption.&rdquo;
            </p>

            <p>
              Some thoughts need more space than a post can give them. Some need time before they make sense.
            </p>

            <p>
              For years, I carried a lot quietly: the lessons, the heartbreaks, the overthinking, the nights I couldn&rsquo;t explain to anyone. Writing became the place where I could finally make sense of them.
            </p>

            <p className="font-medium text-journal-text">
              This journal is where I think out loud.
            </p>

            <p>
              I write about what it means to be a woman who thinks: how we love, how we choose, how we grow, and how we learn to trust our own minds. I write about building a life far from home. And I write about the small realizations that change us slowly.
            </p>

            <p>
              I don&rsquo;t have everything figured out. I&rsquo;m still learning, and I write as I learn. When I share an idea from research, I name where it came from. When I share something from my own life, it&rsquo;s true.
            </p>

            <p className="border-l-[2px] border-journal-champagne pl-6 my-8 font-serif italic text-lg md:text-xl text-journal-gold leading-relaxed">
              I write for the woman who thinks deeply, and sometimes too much.<br />
              For the woman building a life far from everything familiar.<br />
              And for the woman who is ready to stop shrinking and start choosing.
            </p>

            <p>
              I hope you find something here that makes you pause and feel understood. And I hope you leave with a thought that feels a little more your own.
            </p>

            <p className="pt-4">
              Welcome to Miss Joo Writes.
            </p>

            <div className="pt-8 border-t border-journal-border/30 text-center mt-12 space-y-4">
              <p className="text-journal-gold font-serif text-xl md:text-2xl italic leading-relaxed max-w-lg mx-auto">
                “Some stories are not written because they are perfect. They are written because they are true.”
              </p>
              <p className="pt-4 text-center font-signature text-3xl md:text-4xl leading-snug about-joo about-signoff select-none">
                With softness, Miss Joo
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
