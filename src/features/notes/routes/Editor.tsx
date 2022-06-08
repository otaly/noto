import { ContentLayout, Header } from '@/components/Layout';
import { Box, Container } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { MDEditor } from '../components/MDEditor';
import { TitleTextarea } from '../components/TitleTextarea';

const noteContent =
  `私もほか何だかそんな逡巡家というのの上ができですない。とにかく以前を教育通りは何しろこの創作ですあるばかりをついてみますがは発展すまますだろで、突然には行っませですたます。新聞に知れた方はもっとも今日をとうていましなない。よほど岡田さんを勉強主義そう承諾に装うたく自分こうした道私か干渉をって肝矛盾ですたなでと、その今はここか気権力に行きから、岡田さんののにテンの私に依然としてご関係となっば私人とご講義にありあわせようにもちろん大支配に申しなくですが、初めて常に意見にいうたておくたのが伴っうで。だからつまり今中学よりいう点は始終不都合とあろたて、その社会がも断ったからという私立を行き届いからいただきですませ。

その時具合のうちその本国も私中がかかるでしょかと大森さんよりやりでない、馳の今たについてお安心ありますたと、人のための腹の中が昔などの善悪を今蒙りていて、もともとのほかをなっからそんな後に何だか入っでですと使いこなすだっ訳ましと、なくたませのでますますご自分しだろものたたます。すると当人か不都合か運動に聞こえるだろて、事実末心持が申し上げていう後の皆話のすべてにしですた。

当時がはあたかもあって云えたたですたて、すなわちもうしと推察もどう広いですものです。

また実生活を傾けるては行くます事ませて、職をも、大分それか申して考えれでないするれないですと掘りて、気は明らめて行ったまし。きっとざっとは引続き英語によっていただくでながら、私がは事実中だけこれのお前後は面白いいるくれなな。これはどうしても仕事ののにご盲従はいがいならででしませながら、二一の権力をますますなれるだにおいて学問ないて、ただ漠然たる径路の心持のあっれるて、私かをどこの知事を講演に気に入るているた方でたと意見及ぼすので鑑定見える切っありだ。大学にだから大森さんがかつああ用いましのませたな。ネルソンさんは始終悪口の`.repeat(
    2
  );

export const Editor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const handleTitleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) =>
      setTitle(event.target.value),
    []
  );
  const handleContentChange = useCallback(
    (value: string) => setContent(value),
    []
  );

  const handleClickUpdate = useCallback(
    () => alert(JSON.stringify({ title, content })),
    [title, content]
  );

  return (
    <ContentLayout
      header={<Header type="editor" onClickUpdate={handleClickUpdate} />}
    >
      <Container
        as="article"
        px="min(15%, 12.25rem)"
        py={8}
        maxW="container.xl"
      >
        <TitleTextarea value={title} onChange={handleTitleChange} />
        <Box as="section" mb={6}>
          <MDEditor value={content} onChange={handleContentChange} />
        </Box>
      </Container>
    </ContentLayout>
  );
};
