import React, { useState } from 'react';
import { Button, TabBar } from 'shared/ui';
import { PipelineSections } from 'features/pipelineSections';
import { PipelineMainOptions } from 'features/pipelineMainOptions';

import FileManager from '../../components/FileManager/FileManager';
import { IFolder } from '../../components/FileManager/Folder/Folder';
import { IItem } from '../../components/FileManager/Item/Item';

import './PipelinesPage.scss';

const itemsMock: IItem[] = [
  { id: 1, title: 'Трубопровод 1', onPress: () => alert('click on 1') },
  { id: 2, title: 'Трубопровод 2', onPress: () => alert('click on 2') },
];

const foldersMock: IFolder[] = [
  {
    id: 1,
    title: 'Папка 1',
    items: itemsMock,
    folders: [
      { parentId: 1, id: 3, title: 'Папулечка 1' },
      {
        parentId: 1,
        id: 4,
        title: 'Папулечка 2',
        items: [
          {
            parentId: 4,
            id: 3,
            title: 'Трубопровод 3',
            onPress: () => alert('click on 3'),
          },
          {
            parentId: 4,
            id: 4,
            title: 'Трубопровод 4',
            onPress: () => alert('click on 4'),
          },
        ],
      },
    ],
  },
  { id: 2, title: 'Папка 2' },
];

const TABS = ['Основные параметры', 'Участки трубопровода', 'Толщинометрия'];

const PipelinesPage = () => {
  const [tab, setTab] = useState(TABS[1]);

  return (
    <FileManager items={itemsMock} folders={foldersMock}>
      <TabBar
        tabs={TABS}
        selectedTab={tab}
        onChangeTab={setTab}
        rightElement={<Button>Сохранить</Button>}
      >
        {tab === TABS[0] ? <PipelineMainOptions /> : null}
        {tab === TABS[1] ? <PipelineSections /> : null}
        {/* {tab === TABS[2] ? <PipelineMainOptions /> : null} */}
      </TabBar>
    </FileManager>
  );
};

export default PipelinesPage;
