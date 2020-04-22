<template>
  <div class="container-fluid">
    <div class="intro">
      <hr />
      <p>
        This is an entity.json file generator corresponding to
        <b>BotPress</b> format.
      </p>
      <p>
        The idea is to make life easier for non-coders who wish to use
        <b>BotPress</b> and don't have the patience to write a word for word
        list in the <b>BotPress</b> interface :)
      </p>
      <p>
        By generating your own list you can also share it with the other users
        of <b>BotPress</b>
      </p>
      <p>
        In summary: Copy your list of words corresponding to your entity in the
        ENTITIES insert and you get the contents of the json file to upload in
        the indicated directory. Having obviously filled in other entries
      </p>
      <h3>For information</h3>
      <p>There are two types of data format to define an entity :</p>
      <ul>
        <li>
          List.
        </li>
        <li>
          REGular EXPression.
        </li>
      </ul>
      <hr />
    </div>
    <div>
      <h2 style="color: #39b982;">
        Entity :
      </h2>
    </div>
    <div>
      <form class="form-group" style="box-sizing: content-box;">
        <div class="row">
          <div class="col-sm">
            <label>
              <p class="label-txt">TYPE</p>
              <select v-model="typeEntity">
                <option value="list">LIST</option>
                <option value="pattern">REGEXP</option>
              </select>

              <div class="line-box">
                <div class="line"></div>
              </div>
            </label>
          </div>
          <div class="col-sm">
            <label>
              <p class="label-txt">ID</p>
              <input type="text" class="input" v-model="idEntity" />
              <div class="line-box">
                <div class="line"></div>
              </div>
            </label>
          </div>
          <div class="col-sm">
            <label>
              <p class="label-txt">NAME</p>
              <input type="text" class="input" v-model="nameEntity" />
              <div class="line-box">
                <div class="line"></div>
              </div>
            </label>
          </div>
        </div>

        <div class="row">
          <div class="col-sm">
            <label>
              <p class="label-txt">FUZZY</p>
              <select v-model="fuzzyEntity">
                <option value="1">STRICT</option>
                <option value="0.8">MOYEN</option>
                <option value="0.65">INDULGENT</option>
              </select>
              <div class="line-box">
                <div class="line"></div>
              </div>
            </label>
          </div>
          <div class="col-sm">
            <label>
              <p class="label-txt">SENSIBILITY</p>
              <select v-model="sensitiveEntity">
                <option value="true">YES</option>
                <option value="false">NO</option>
              </select>
              <div class="line-box">
                <div class="line"></div>
              </div>
            </label>
          </div>
          <div class="col-sm">
            <label>
              <p class="label-txt">MATCHCASE</p>
              <select v-model="matchcaseEntity">
                <option value="true">YES</option>
                <option value="false">NO</option>
              </select>
              <div class="line-box">
                <div class="line"></div>
              </div>
            </label>
          </div>
        </div>

        <div class="row"></div>

        <label v-if="this.typeEntity === 'list'">
          <p class="label-txt">ENTITIES</p>
          <br />
          <textarea
            wrap="off"
            cols="30"
            rows="10"
            placeholder="Available Formats:

entityName
entityName:synonym
entityName:synonym,synonym,...

One entity by line"
            v-on:keyup="pushOccurrences"
          >
          </textarea>
          <div class="line-box">
            <div class="line"></div>
          </div>
        </label>
        <div v-else>
          <label>
            <p class="label-txt">PATTERN</p>
            <input v-model="patternEntity" type="text" class="input" />
            <div class="line-box">
              <div class="line"></div>
            </div>
          </label>
          <label>
            <p class="label-txt">EXAMPLE</p>
            <input v-model="examplesEntity" type="text" class="input" />
            <div class="line-box">
              <div class="line"></div>
            </div>
          </label>
        </div>
      </form>
      <div v-if="this.idEntity.length > 0">
        <div>
          <h2 style="color: #39b982;">
            Result :
          </h2>
        </div>
        <div class="result">
          <pre class="prettyprint lang-js">{{ jsonstring }}</pre>
        </div>
        <div class="intro">
          <p>
            Copy the above content and create the json file below<br />
            <i
              >./botpress/data/bots/NAME_OF_YOUR_BOT/entities/{{
                jsonEntity.id + ".json"
              }}</i
            ><br />
            COPY/PASTE ... Save it and enjoy your bot !!!
          </p>
        </div>
      </div>

      <hr />
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      selected: "selected",
      occur: [],
      syno: [],
      synoTemp: [],
      synonymsTemp: [],
      idEntity: "",
      nameEntity: "",
      typeEntity: "list",
      occurrencesEntity: [],
      sensitiveEntity: false,
      fuzzyEntity: 0.8,
      matchcase: false,
      examplesEntity: [],
      patternEntity: "",
      occurEntity: "",
      matchcaseEntity: false,
      jsonEntity: {
        id: this.idEntity,
        name: this.nameEntity,
        type: this.typeEntity,
        occurrences: this.occurrencesEntity,
        sensitive: this.sensitiveEntity,
        fuzzy: parseFloat(this.fuzzyEntity),
        examples: this.examplesEntity,
        pattern: this.patternEntity,
        matchcase: this.matchcaseEntity,
      },
    };
  },
  computed: {
    jsonstring: function() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.jsonEntity.id = this.idEntity;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.jsonEntity.name =
        this.nameEntity.length > 0 ? this.nameEntity : this.idEntity;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.jsonEntity.type = this.typeEntity;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.jsonEntity.occurrences = this.occurrencesEntity;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.jsonEntity.sensitive = Boolean(this.sensitiveEntity === "true");
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.jsonEntity.fuzzy = parseFloat(this.fuzzyEntity);
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.jsonEntity.examples = this.examplesEntity;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.jsonEntity.pattern = this.patternEntity;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.jsonEntity.matchcase = Boolean(this.matchcaseEntity === "true");
      return JSON.stringify(this.jsonEntity, null, 4);
    },
  },
  methods: {
    changeJson: function() {
      this.occur = event.target.value;
    },
    getid: function() {
      this.idEntity = event.target.value;
    },
    getname: function() {
      this.nameEntity = event.target.value;
    },
    pushOccurrences: function() {
      this.occurrencesEntity = [];
      this.occur = event.target.value.split("\n");
      for (var i = 0; i < this.occur.length; i++) {
        this.synonymsTemp = [];
        this.syno = [];
        if (this.occur[i].indexOf(":") > -1) {
          this.synonymsTemp = this.occur[i].split(":");
          if (this.synonymsTemp[1].indexOf(",")) {
            this.syno = [];
            this.synoTemp = this.synonymsTemp[1].split(",");
            for (var j = 0; j < this.synoTemp.length; j++) {
              this.syno.push(this.synoTemp[j]);
            }
            this.occurrencesEntity.push({
              name: this.occur[i].split(":")[0],
              synonyms: this.syno,
            });
          } else {
            this.occurrencesEntity.push({
              name: this.occur[i].split(":")[0],
              synonyms: this.synonymsTemp,
            });
          }
        } else {
          this.occurrencesEntity.push({ name: this.occur[i], synonyms: [] });
        }
      }
      return this.occurrencesEntity;
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  background: #c5e1a5;
}
form {
  width: 100%;
  margin: 0px auto;
  background: #efefef;
  padding: 0px 0px 0px 0px;
  text-align: center;
  box-shadow: 4px 9px 10px rgba(0, 0, 0, 0.33);
}

.result {
  box-shadow: 4px 9px 10px rgba(0, 0, 0, 0.33);
}
select {
  width: 100%;
  height: 52px;
  padding: 0 24px 0 10px;
  vertical-align: middle;
  font-family: sans-serif;
  font-size: 0.8em;
  letter-spacing: 1px;
  color: rgb(120, 120, 120);
  background: #fff no-repeat right 12px center;
  background-size: 8px 10px;
  border: 1px rgba(0, 0, 0, 0.4);
  border-radius: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

label {
  display: block;
  position: relative;
  margin: 40px 0px;
}

.intro {
  font-family: sans-serif;
  font-size: 1em;
  letter-spacing: 1px;
  color: rgb(120, 120, 120);
}

.label-txt {
  position: absolute;
  top: -1.6em;
  padding: 10px;
  font-family: sans-serif;
  font-size: 0.8em;
  letter-spacing: 1px;
  color: rgb(120, 120, 120);
  transition: ease 0.3s;
}
.input {
  width: 100%;
  padding: 10px;
  background: transparent;
  border: none;
  outline: none;
  font-family: sans-serif;
  font-size: 1em;
  letter-spacing: 1px;
  color: rgb(120, 120, 120);
}

.line-box {
  position: relative;
  width: 100%;
  height: 2px;
  background: #bcbcbc;
}

.line {
  position: absolute;
  width: 0%;
  height: 2px;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  background: #8bc34a;
  transition: ease 0.6s;
}

.input:focus + .line-box .line {
  width: 100%;
}

.label-active {
  top: -3em;
}

button {
  display: inline-block;
  padding: 12px 24px;
  background: rgb(220, 220, 220);
  font-weight: bold;
  color: rgb(120, 120, 120);
  border: none;
  outline: none;
  border-radius: 3px;
  cursor: pointer;
  transition: ease 0.3s;
}

button:hover {
  background: #8bc34a;
  color: #ffffff;
}
</style>
