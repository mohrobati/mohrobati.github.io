---
title: The History of BERT
excerpt: "In late 2018, Google published a paper that rewrote the state of the art on eleven NLP benchmarks in a single stroke. BERT taught machines to read language in both directions at once, and in doing so it changed how the field thinks about pre-training, fine-tuning, and what a language model can be."
---

## The History of BERT

### The Model That Taught Machines to Read Both Ways

In late 2018, researchers at Google published a paper titled "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding." It did not have the viral consumer moment that ChatGPT would later enjoy, but within the research community it landed like a thunderclap. BERT rewrote the state of the art on eleven natural language processing benchmarks in a single stroke and, more importantly, it changed how the field thought about what a language model could be.

This is the story of where BERT came from, why it mattered, and how its influence still echoes through modern AI.

### The World Before BERT

To understand why BERT was such a rupture, it helps to recall the state of natural language processing in the mid-2010s. The dominant architectures were recurrent neural networks (RNNs) and their gated cousins, long short-term memory networks (LSTMs) and gated recurrent units (GRUs). These models processed text sequentially, one token at a time, carrying a hidden state forward like a running memory of what had come before.

They worked, often impressively, but they had structural limitations:

- **Sequential computation** made them slow to train. A sentence of length N required N sequential steps, and there was no easy way to parallelize across those steps on a GPU.
- **Long-range dependencies** were fragile. By the time an LSTM reached the end of a long paragraph, information from the beginning had often decayed away, no matter how carefully the gates were tuned.
- **Unidirectional context** was baked in. A left-to-right LSTM could only condition each word on the words that came before it, even though meaning often depends on words that come after.

Researchers compensated with elaborate tricks. Bidirectional LSTMs ran one network left-to-right and another right-to-left and concatenated their outputs. Encoder-decoder setups with attention mechanisms allowed models to focus on relevant parts of the input. These workarounds helped, but they were patches on a deeper architectural constraint.

### The Transformer Arrives

The turning point came in June 2017, when Vaswani and colleagues at Google published "Attention Is All You Need." That paper introduced the Transformer, an architecture that dispensed with recurrence entirely and instead relied on self-attention: a mechanism by which every token in a sequence attends directly to every other token, regardless of distance.

The Transformer had two properties that proved decisive:

1. **It was massively parallelizable.** Because all tokens were processed simultaneously rather than sequentially, a Transformer could saturate modern GPU and TPU hardware in a way that RNNs simply could not.
2. **It captured long-range dependencies naturally.** The path length between any two positions in the input was constant, so a word at the start of a paragraph could directly influence a word at the end.

The original Transformer was designed for machine translation, with an encoder stack and a decoder stack. Almost immediately, researchers began pruning and repurposing it. Two directions emerged.

### The Two Roads: GPT and ELMo

In the months after the Transformer paper, two influential lines of work began to converge on the idea of pre-training a general language representation and then fine-tuning it for specific tasks.

The first was ELMo, introduced by Peters and colleagues at the Allen Institute for AI in early 2018. ELMo stood for Embeddings from Language Models, and it trained bidirectional LSTM language models on large text corpora, then used the internal layers of those models as contextual word embeddings. The key insight was radical at the time: instead of using a single fixed vector per word, as Word2Vec and GloVe did, ELMo produced embeddings that changed depending on the surrounding context. The word "bank" in "river bank" and "bank account" would get different vectors.

ELMo produced immediate improvements across a wide range of tasks, and it signaled that pre-trained contextual representations were the future. But it was still built on LSTMs, with all their sequential limitations.

The second line was GPT, introduced by Radford and colleagues at OpenAI in June 2018. GPT took the decoder half of the Transformer and trained it as a unidirectional language model, predicting the next token given the previous tokens. It then showed that the same pre-trained model could be fine-tuned to achieve strong results on tasks as diverse as classification, entailment, similarity, and multiple-choice question answering.

GPT was powerful, but its language modeling objective was strictly left-to-right. Each token could only attend to the tokens before it. For tasks that required understanding a full sentence, such as determining whether a word was used correctly or answering a question about a passage, this was a real constraint.

### The BERT Insight

BERT, introduced by Jacob Devlin, Ming-Wei Chang, Kenton Lee, and Kristina Toutanova at Google, was built on a single, deceptively simple question: what if a language model could look at the whole sentence in both directions at once?

The technical answer was to take the encoder half of the Transformer, the part designed to produce rich representations of an input sequence, and train it with a masked language modeling objective. Instead of predicting every next token, BERT randomly masked some percentage of tokens in the input and asked the model to predict them. Because the masking was applied after the model had access to the full sequence, predicting a masked token could use both its left and right context.

This was the crucial difference from GPT. A left-to-right model predicting the word after "The bank of the" has only seen the preceding context. BERT, predicting the masked word in "The bank of the [MASK] is overflowing," can use the entire sentence on both sides. The representation it learns is genuinely bidirectional.

BERT added a second pre-training task called Next Sentence Prediction, in which the model was shown pairs of sentences and asked whether the second sentence logically followed the first. This was intended to prepare the model for tasks like question answering and natural language inference, where understanding relationships between sentences matters.

### Architecture and Scale

BERT used the Transformer encoder architecture and came in two sizes:

- **BERT-Base** had 12 layers, a hidden size of 768, 12 attention heads, and roughly 110 million parameters.
- **BERT-Large** had 24 layers, a hidden size of 1024, 16 attention heads, and roughly 340 million parameters.

These numbers sound modest today, when frontier models exceed a trillion parameters, but in late 2018 they were substantial. BERT was pre-trained on the BooksCorpus, roughly 800 million words of novel-length text, and on English Wikipedia, roughly 2.5 billion words. Training BERT-Large required four days on four Cloud TPUs, which was expensive but not extraordinary by research-lab standards.

The training data was deliberately broad and unlabelled. BERT learned purely from the structure of text itself, with no task-specific annotations. All the task-specific learning happened later, during fine-tuning.

### Fine-Tuning: The Elegant Second Act

One of the most influential aspects of BERT was not the model itself but the recipe for using it. After pre-training, BERT could be adapted to a specific task by adding a small task-specific output layer on top of the pre-trained encoder and then fine-tuning all the weights jointly on a modest amount of labeled data for that task.

This typically required only a few epochs on a single GPU and a few thousand examples. The same pre-trained model could be fine-tuned for sentiment analysis, named entity recognition, question answering, or sentence pair classification, simply by changing the output head and the fine-tuning data.

This was a profound shift. Before BERT, each NLP task often required a bespoke architecture, hand-crafted features, and extensive task-specific engineering. After BERT, the dominant pattern became: take a pre-trained model, add a thin task head, fine-tune, and ship. The architectural ingenuity moved upstream into the pre-training recipe, and the downstream work became far more uniform.

### The Benchmark Sweep

When BERT was evaluated, the results were startling. It set new state-of-the-art records on eleven NLP tasks, including:

- **GLUE**, a multi-task benchmark for general language understanding, where BERT-Large scored 80.5, a jump of more than seven points over the previous best.
- **SQuAD**, the Stanford Question Answering Dataset, where BERT matched or exceeded human performance on the F1 metric for extracting answer spans from passages.
- **SWAG**, a commonsense reasoning benchmark, where BERT-Large improved the state of the art by nearly nine percentage points.

These were not incremental gains. In a field where a single point of improvement on a benchmark was often considered a publishable result, BERT moved the needle by margins that would have seemed implausible a year earlier.

### Why It Spread So Fast

Several factors made BERT's impact unusually rapid and broad:

- **Open weights.** Google released both the pre-trained models and the code, which meant that any researcher could download BERT and fine-tune it within hours rather than spending months and tens of thousands of dollars on pre-training.
- **Simple fine-tuning recipe.** Because the adaptation process was so lightweight, adoption did not require deep expertise in pre-training. A graduate student with a single GPU could get state-of-the-art results on a task with a few hundred lines of code.
- **Task generality.** The same model worked across a remarkable range of tasks, which meant that the effort invested in learning the recipe paid off across many projects.
- **Industry relevance.** The tasks BERT excelled at, classification, entity recognition, question answering, were exactly the tasks that powered search, recommendation, and support systems in production. Within months, BERT variants were being deployed at scale.

### BERT in Search

One of the most visible applications came from Google itself. In late 2019, Google announced that BERT was being used to improve search results, initially for one in ten English queries in the United States. The improvement was most noticeable on longer, more conversational queries, or queries where prepositions such as "to" and "for" carried important meaning.

The example Google highlighted was the query "2019 brazil traveler to usa need a visa." Before BERT, Google's system largely ignored the word "to," and focused on the concept of a US visa for a Brazilian traveler, which could be misread as a query about Americans traveling to Brazil. With BERT, the model understood the directional relationship, and returned results about Brazilians traveling to the United States.

It was a small, concrete illustration of what bidirectional understanding bought you. Within months, BERT was rolled out to over seventy languages.

### The Cambrian Explosion of Variants

BERT's release triggered a wave of follow-up work. Within a year and a half, the field had produced an entire zoo of BERT variants, each tweaking some aspect of the recipe:

- **RoBERTa**, from Facebook AI, revisited BERT's pre-training and found that with longer training, larger batches, more data, and the removal of the Next Sentence Prediction task, the same architecture could substantially outperform the original BERT. It was a pointed reminder that much of BERT's power came not from architectural novelty but from the training recipe.
- **ALBERT**, from Google Research, reduced the parameter count through parameter-sharing and factorized embedding techniques, making large models more tractable without sacrificing much accuracy.
- **DistilBERT**, from Hugging Face, used knowledge distillation to produce a model roughly 40 percent smaller and 60 percent faster while retaining about 95 percent of BERT's capability, a demonstration that production deployment did not require the full model.
- **TinyBERT** and other distillation efforts pursued similar goals with different techniques.
- **ELECTRA**, from researchers at Stanford and Google, replaced the masked language modeling objective with a "replaced token detection" task, in which the model learned to distinguish real tokens from plausible impostors, a far more sample-efficient form of pre-training.
- **SpanBERT**, **StructBERT**, **LBERT**, and many others introduced task- or domain-specific modifications.

There were also domain-specific BERTs. **BioBERT** was pre-trained on biomedical literature. **SciBERT** focused on scientific papers. **ClinicalBERT** targeted clinical notes. **Legal-BERT** handled legal text. Each demonstrated that a modest amount of domain-specific continued pre-training could yield large gains on in-domain tasks.

Multilingual coverage followed. **mBERT**, released alongside the original, was pre-trained on the Wikipedia of 104 languages using a shared vocabulary and shared parameters. Despite having no explicit cross-lingual supervision, it exhibited remarkable cross-lingual transfer: fine-tuning on English data often produced a model that could perform the same task in other languages. **XLM** and later **XLM-R** pushed this further with improved multilingual training recipes and much larger corpora.

### BERT vs. GPT: Two Philosophies

It is worth pausing to contrast BERT with the GPT line, because the two came to represent two different philosophies about what a language model should be.

BERT was an **encoder-only** model, trained with a bidirectional objective, and optimized for representation. Its strength was understanding: taking a piece of text and producing a rich contextual embedding that could be used for classification, extraction, or ranking. It was not designed to generate text, and using it for generation required awkward workarounds.

GPT was a **decoder-only** model, trained with a unidirectional objective, and optimized for generation. Its strength was producing fluent continuations of text. It could be fine-tuned for understanding tasks, but its representations were shaped by the left-to-right prediction objective.

For several years, these two camps coexisted. BERT and its encoder variants dominated benchmarks and production systems for understanding tasks. GPT and its descendants quietly improved at generation, until GPT-3's in-context learning demonstrated that a large enough generative model could handle understanding tasks as a side effect, and the decoder-only approach began to take over the frontier.

The eventual triumph of the decoder-only architecture is, in retrospect, one of the more surprising turns in the field. BERT's bidirectional objective was widely seen as the more principled choice for representation learning. But the decoder-only architecture proved easier to scale, easier to sample from, and more naturally extensible to multimodal and conversational settings. Today, most frontier models are decoder-only, and BERT-style encoders are largely confined to specialized production and retrieval settings where their efficiency and representation quality still win.

### The Legacy

Even as generative models have captured public attention, BERT's influence is everywhere in the plumbing of modern AI.

**In retrieval and search.** The idea of mapping queries and documents into a shared embedding space for semantic search, sometimes called dense retrieval, was made practical by BERT-style encoders. Systems like DPR (Dense Passage Retrieval) and the retrieval components of modern search stacks still rely heavily on encoder architectures, often distilled or quantized for latency.

**In the pre-train then fine-tune paradigm.** The pattern that BERT crystallized, pre-train a general model on broad data at scale, then adapt it cheaply to many downstream tasks, became the default methodology for the entire field. Generative models inherited this paradigm and extended it; they did not replace it.

**In the culture of open releases.** BERT's open release of both code and weights set a norm that, at least for a time, accelerated the entire field. Researchers could build on BERT directly, compare against it rigorously, and propose improvements with full reproducibility. The open-weight culture that later surrounded LLaMA, Mistral, and the broader open-source LLM ecosystem owes a great deal to the precedent that BERT and its contemporaries established.

**In benchmark practices.** GLUE, and its successor SuperGLUE, were designed partly to evaluate models like BERT. The existence of a shared, challenging, multi-task benchmark made it possible to measure progress in a way that single-task evaluation never had. BERT's sweeping improvement on GLUE is what made it so visibly a step change rather than an incremental gain.

### A Brief Timeline

For reference, the key milestones:

- **June 2017** — "Attention Is All You Need" introduces the Transformer.
- **February 2018** — ELMo introduces contextual embeddings from bidirectional LSTMs.
- **June 2018** — GPT-1 shows the pre-train then fine-tune recipe with a Transformer decoder.
- **October 2018** — BERT paper published; models and code released.
- **Late 2018** — BERT sets state of the art on eleven NLP benchmarks.
- **2019** — Wave of variants: RoBERTa, ALBERT, DistilBERT, ELECTRA, domain-specific BERTs.
- **October 2019** — Google announces BERT in Search, initially for English queries.
- **2019-2020** — Multilingual BERT and XLM-R extend the approach to over a hundred languages.
- **2020 onward** — Decoder-only models (GPT-3 and successors) begin to dominate the research frontier, but encoder models remain central to retrieval, search, and production NLP.

### Looking Back

BERT is rarely the subject of headlines anymore. It does not write poetry or hold a conversation, and it cannot see an image or reason step by step. In the public imagination, it has been thoroughly overshadowed by the generative models that followed.

But BERT was the moment that natural language processing, as a field, crossed a threshold. After BERT, the default approach was to pre-train a large model on broad text and adapt it to the task at hand, rather than to engineer task-specific systems from scratch. After BERT, the Transformer was no longer one architecture among many but the architecture. After BERT, the idea that a single model could be fine-tuned to near-state-of-the-art performance across dozens of tasks, with a few hours of compute and a few thousand examples, was no longer aspirational but routine.

Every generative model that captures attention today is, in some sense, a descendant of the same Transformer architecture that BERT brought to the center of the field. The particular branch BERT represented, encoder-only and representation-focused, may no longer sit at the frontier. But the lessons it taught, about scale, about pre-training, about the value of open releases, and about the surprising power of letting a model look at language in both directions at once, are baked into the foundations of everything that followed.

---

*This post is a retrospective written for the blog. Dates and figures reflect publicly reported information as of the time of writing.*
