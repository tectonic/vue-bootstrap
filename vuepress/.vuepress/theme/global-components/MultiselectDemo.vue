<template>
  <demo>
    <div class="panel panel-default">
      <div class="panel-body">
        <multiselect
          :options="multiselectOptions"
          :subset="true"
          subset-label="Total"
          :randomizer="true"
          randomizer-help-text="Help text."
        />
      </div>
    </div>
  </demo>
</template>

<script>
export default {
  data() {
    return {
      multiselectOptions: [
        { id: 1, name: 'Action',
          children: [
            { id: 2, name: 'Martial Arts', extra: 'Extra information.' },
            { id: 3, name: 'Treasure Hunts' },
            { id: 4, name: 'Adventures',
              children: [
                { id: 5, name: 'Sea Adventures', extra: 'Extra information.' },
                { id: 6, name: 'Underwater Adventures' }
              ]
            }
          ]
        },
        { id: 7, name: 'Comedy',
          children: [
            { id: 8, name: 'Parody' },
            { id: 9, name: 'Spoofs' },
            { id: 10, name: 'Slapstick' }
          ]
        },
        { id: 11, name: 'Crime & Gangster', disabled: true,
          children: [
            { id: 12, name: 'Lovers on the run' },
            { id: 13, name: 'Mysteries' },
            { id: 14, name: 'Film Noir' }
          ]
        },
        { id: 15, name: 'Drama',
          children: [
            { id: 16, name: 'High School' },
            { id: 17, name: 'Love Story' },
            { id: 18, name: 'Soap Opera' },
            { id: 19, name: 'Medical' }
          ]
        },
        { id: 20, name: 'Horror' },
        { id: 21, name: 'Science Fiction' }
      ]
    };
  }
};
</script>
