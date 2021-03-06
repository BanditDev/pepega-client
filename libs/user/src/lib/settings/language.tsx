import React from 'react';
import { Locale, useMeQuery, useSetUserLocaleMutation } from '@dream/types';
import { RadioGroup } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faDotCircle } from '@fortawesome/free-regular-svg-icons';
import clsx from 'clsx';
import { useIntl } from 'react-intl';

const languages = [
  {
    id: 'en',
    flag: 'usa',
    name: 'English, US',
    value: Locale.EnUs,
    langId: 'userSettingsLanguageEnglishUS',
  },
  {
    id: 'ru',
    flag: 'russia',
    name: 'Русский',
    value: Locale.RuRu,
    langId: 'userSettingsLanguageRussian',
  },
];

export const UserSettingsLanguage = () => {
  const { formatMessage } = useIntl();
  const meQuery = useMeQuery();
  const user = meQuery?.data?.me;

  const [setUserLocale] = useSetUserLocaleMutation({
    onCompleted: (data) => {
      meQuery.refetch();
    },
  });

  return (
    <div>
      <div className="flex w-full mb-2">
        <RadioGroup
          className="w-full"
          value={user?.locale}
          onChange={(v) => setUserLocale({ variables: { locale: v } })}
        >
          <RadioGroup.Label className="text-accent text-xs">
            Select a language
          </RadioGroup.Label>
          <div className="flex flex-col w-full">
            {languages.map((language) => (
              <RadioGroup.Option key={language.id} value={language.value}>
                {({ checked }) => (
                  <div className="flex w-full rounded my-1 bg-background hover:bg-background-light cursor-pointer">
                    <div className="px-4 flex items-center">
                      <FontAwesomeIcon
                        icon={checked ? faDotCircle : faCircle}
                        className={clsx(
                          'h-5 w-5',
                          checked ? 'text-white' : 'text-accent opacity-80'
                        )}
                      />
                    </div>
                    <div className="flex w-full py-2">
                      <RadioGroup.Label as="div" className="text-sm">
                        {language.name}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="div"
                        className="ml-auto px-2 flex"
                      >
                        <div className="text-xs text-accent px-2">
                          {formatMessage({ id: language.langId })}
                        </div>
                        <img
                          className="h-5 w-5"
                          src={`/flags/${language.flag}.svg`}
                          alt={language.name}
                        />
                      </RadioGroup.Description>
                    </div>
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
