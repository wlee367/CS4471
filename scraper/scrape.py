from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
import time
import csv
from datetime import datetime

def to_military(m):
    in_time = datetime.strptime(m, "%I:%M %p")
    out_time = datetime.strftime(in_time, "%H:%M")
    return out_time

url = "http://studentservices.uwo.ca/secure/timetables/mastertt/ttindex.cfm"

chromedriver = "/Users/jasonlee/CS4471/scraper/chromedriver"

driver = webdriver.Chrome(chromedriver)
driver.get(url)

courseCodes = ["ACTURSCI", "AMERICAN", "ANATCELL", "ANTHRO", "APPLMATH", "ARABIC", "ARTHUM", "ASTRONOM", "BIBLSTUD", "BIOCHEM", "BIOLOGY", "BIOSTATS", "MTP-RADO", "MTP-TVSN", "MTP-FLDP", "BUSINESS", "CALCULUS", "CGS", "CBE", "CHEMBIO", "CHEM", "CSI", "CHINESE", "CHURCH", "CHURLAW", "CHURMUSI", "CEE", "CLASSICS", "CMBPROG", "COMMSCI", "COMPLIT", "COMPSCI", "DANCE", "DIGICOMM", "MTP-DIGL", "DIGIHUM", "DOL", "DISABST", "EARTHSCI", "ECONOMIC", "EELC", "ECE", "ENGSCI", "ENGLISH", "ENVIRSCI", "EPID", "EPIDEMIO", "FAMLYSTU", "FLDEDUC", "MTP-FILM", "FILM", "FINMOD", "FRSTNATN", "FOODNUTR", "FRENCH", "GEOGRAPH", "GEOLOGY", "GEOPHYS", "GERMAN", "GREEK", "GPE", "HEALTSCI", "HEBREW", "HINDI", "HISTTHEO", "HISTORY", "HISTSCI", "HOMILET", "HUMANECO", "INTEGSCI", "ICC", "INTERDIS", "INTREL", "ITALIAN", "JAPANESE", "JEWISH", "MTP-BRJR", "KINESIOL", "LATIN", "LAW", "LINGUIST", "LITURST", "LITURGIC", "MOS", "MTP-MKTG", "MATH", "MME", "MSE", "MIT", "MEDBIO", "MEDHINFO", "MEDSCIEN", "MEDIEVAL", "MICROIMM", "MORALTHE", "MTP-MMED", "MUSIC", "NEURO", "NURSING", "PASTTHEO", "PATHOL", "PERSIAN", "PHARM", "PHILST", "PHILOSOP", "PHYSICS", "PHYSIOL", "PHYSPHRM", "POLISCI", "PORTUGSE", "PSYCHOL", "REHABSCI", "RELEDUC", "RELSTUD", "SACRTHEO", "SCHOLARS", "SCIENCE", "SOCLJUST", "SOCWORK", "SOCIOLOG", "SE", "SPANISH", "SPEECH", "SPIRTHEO", "STATS", "SUPPAST", "SYSTHEO", "THANAT", "THEATRE", "THEOETH", "THEOLST", "THESIS", "TJ", "VAHISTRY", "VASTUDIO", "WTC", "WOMENST", "WORLDLIT", "WRITING"] 
data = []

# Where H is Thursday.
days = ["M","T","W","H","F"]

f = csv.writer(open("output.csv", "w"))
data.append(["Course Code Start End Location Days"])

for j, code in enumerate(courseCodes):

    # data.append(code)
    # Take a break after every scrape otherwise we run into a captcha.
    time.sleep(10)
    print(code)
    select = Select(driver.find_element_by_id('inputSubject'))
    select.select_by_value(code)

    driver.find_element_by_css_selector('.btn.btn-info.span2').click()

    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")

    table = soup.find(class_='table table-striped')
    title = soup.find_all('h4')
    for t in title:
        captions = t.text.split()
        course = captions[0]
        code = captions[1]
        print(course + code)

        for t in soup.find_all('table'):
            # print('here2')
            for row in t.find_all('tr'):
                # print('line 55')
                a = []
                l = 0
                daySequence = ""

                for i, col in enumerate(row.find_all('td')):
                    try:
                        if i > 3 and i < 9:
                            if col.contents[0] and col.contents[0].strip():
                                daySequence = daySequence + days[i-4]
                                # print('does this ever fire')
                        elif i>8 and i<12:
                            try:
                                a.append(col.contents[0])
                                l = l+1
                            except:
                                # print('pass')
                                pass
                        if l == 3:
                            data.append([captions[0]+ " " + captions[1] +" "+to_military(a[0])+" "+to_military(a[1])+ " " + a[2] + " " + daySequence])                  
                            print([captions[0]+" " + captions[1]+" "+to_military(a[0])+" "+to_military(a[1])+ " " + a[2] + " " + daySequence])
                    except:
                        # print('this code block is not being executed')
                        pass
# print(data)
f.writerows(data)

#     for counter, t in enumerate(soup.find_all('table')):
        
#         # for i, caption in enumerate(captions):
#             # print(caption)
#         try:
#             captions = t.find_all('h4')
#             strings = captions[0].text.split()    
#             course = strings[0]
#             code = strings[1]
#         except:
#             pass
#         # soup.find_next('h4')

#         for row in soup.find_all('tr'):
#             a = []
#             l = 0
#             daySequence = ""
#             for i, col in enumerate(row.find_all('td')):
#                 if i > 3 and i < 9:
#                     if col.contents[0] and col.contents[0].strip():
#                         daySequence = daySequence + days[i - 4]
#                 elif i > 8 and i < 12:
#                     try:
#                         a.append(col.contents[0])
#                         l = l + 1
#                     except:
#                         pass
#             if l == 3:
#                 data.append([strings[0]+ " " + strings[1] +" "+to_military(a[0])+" "+to_military(a[1])+ " " + a[2] + " " + daySequence])                  
#                 print([strings[0]+" " + strings[1]+" "+to_military(a[0])+" "+to_military(a[1])+ " " + a[2] + " " + daySequence])
# # print(data)
# f.writerows(data)







